-- AlterTable: add column nullable so existing rows can be backfilled deterministically
ALTER TABLE "party_members" ADD COLUMN IF NOT EXISTS "counter" INTEGER;

-- Backfill existing rows with a contiguous 1..N sequence ordered by party, then order_index
WITH numbered AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "party_name", "order_index", "id") AS rn
  FROM "party_members"
)
UPDATE "party_members" pm
SET "counter" = numbered.rn
FROM numbered
WHERE pm."id" = numbered."id"
  AND pm."counter" IS NULL;

-- CreateFunction: returns the next global counter value (created after the column exists)
CREATE OR REPLACE FUNCTION next_party_member_counter()
RETURNS integer LANGUAGE sql AS $$
  SELECT COALESCE(MAX(counter), 0) + 1 FROM party_members;
$$;

-- Lock down the column: required, with the auto-assigning default
ALTER TABLE "party_members"
  ALTER COLUMN "counter" SET NOT NULL,
  ALTER COLUMN "counter" SET DEFAULT next_party_member_counter();

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "party_members_counter_key" ON "party_members"("counter");

-- CreateFunction: keep the counter gapless by shifting rows above a deleted one down by 1
CREATE OR REPLACE FUNCTION party_members_renumber_after_delete()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  UPDATE "party_members"
  SET "counter" = "counter" - 1
  WHERE "counter" > OLD."counter";
  RETURN OLD;
END;
$$;

-- CreateTrigger (drop first so re-running is safe)
DROP TRIGGER IF EXISTS trg_party_members_renumber ON "party_members";
CREATE TRIGGER trg_party_members_renumber
AFTER DELETE ON "party_members"
FOR EACH ROW
EXECUTE FUNCTION party_members_renumber_after_delete();
