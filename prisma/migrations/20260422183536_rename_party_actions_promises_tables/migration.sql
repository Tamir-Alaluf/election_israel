/*
  Warnings:

  - You are about to drop the `future_promises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recent_actions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "future_promises" DROP CONSTRAINT "future_promises_action_group_name_fkey";

-- DropForeignKey
ALTER TABLE "future_promises" DROP CONSTRAINT "future_promises_party_name_fkey";

-- DropForeignKey
ALTER TABLE "recent_actions" DROP CONSTRAINT "recent_actions_action_group_name_fkey";

-- DropForeignKey
ALTER TABLE "recent_actions" DROP CONSTRAINT "recent_actions_party_name_fkey";

-- DropTable
DROP TABLE "future_promises";

-- DropTable
DROP TABLE "recent_actions";

-- CreateTable
CREATE TABLE "party_recent_actions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "party_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_name" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "party_recent_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_future_promises" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "party_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_name" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "party_future_promises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "party_recent_actions_party_name_order_index_idx" ON "party_recent_actions"("party_name", "order_index");

-- CreateIndex
CREATE INDEX "party_recent_actions_action_group_name_idx" ON "party_recent_actions"("action_group_name");

-- CreateIndex
CREATE INDEX "party_future_promises_party_name_order_index_idx" ON "party_future_promises"("party_name", "order_index");

-- CreateIndex
CREATE INDEX "party_future_promises_action_group_name_idx" ON "party_future_promises"("action_group_name");

-- AddForeignKey
ALTER TABLE "party_recent_actions" ADD CONSTRAINT "party_recent_actions_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_recent_actions" ADD CONSTRAINT "party_recent_actions_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_future_promises" ADD CONSTRAINT "party_future_promises_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_future_promises" ADD CONSTRAINT "party_future_promises_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
