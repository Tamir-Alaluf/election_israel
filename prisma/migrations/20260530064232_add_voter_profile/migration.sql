-- CreateTable
CREATE TABLE "voter_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "age_group" TEXT,
    "gender" TEXT,
    "religiosity" TEXT,
    "region" TEXT,
    "life_stage" TEXT,
    "employment_status" TEXT,

    CONSTRAINT "voter_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voter_profiles_user_id_key" ON "voter_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "voter_profiles" ADD CONSTRAINT "voter_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
