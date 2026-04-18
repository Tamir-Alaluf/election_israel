/*
  Warnings:

  - You are about to drop the column `action_group_id` on the `candidate_career_actions` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `candidate_career_actions` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `candidate_educations` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `candidate_professionals` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `candidate_professionals` table. All the data in the column will be lost.
  - You are about to drop the column `action_group_id` on the `candidate_recent_actions` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `candidate_recent_actions` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `action_group_id` on the `future_promises` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `future_promises` table. All the data in the column will be lost.
  - You are about to drop the column `glossary_category_id` on the `glossary_terms` table. All the data in the column will be lost.
  - You are about to drop the column `legislation_group_id` on the `legislations` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `parties` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `party_base_topics` table. All the data in the column will be lost.
  - You are about to drop the column `legislation_id` on the `party_legislations` table. All the data in the column will be lost.
  - You are about to drop the column `option_id` on the `party_legislations` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `party_legislations` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `party_members` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `public_opinions` table. All the data in the column will be lost.
  - You are about to drop the column `action_group_id` on the `recent_actions` table. All the data in the column will be lost.
  - You are about to drop the column `party_id` on the `recent_actions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `action_groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `glossary_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `legislation_groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[display_value]` on the table `legislation_options` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `legislations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `parties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `professional_groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action_group_name` to the `candidate_career_actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_name` to the `candidate_career_actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_name` to the `candidate_educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_name` to the `candidate_professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_name` to the `candidate_professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `action_group_name` to the `candidate_recent_actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_name` to the `candidate_recent_actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `action_group_name` to the `future_promises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `future_promises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glossary_category_name` to the `glossary_terms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legislation_group_name` to the `legislations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `party_base_topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legislation_title` to the `party_legislations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_display_value` to the `party_legislations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `party_legislations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `party_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_name` to the `public_opinions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `action_group_name` to the `recent_actions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_name` to the `recent_actions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidate_career_actions" DROP CONSTRAINT "candidate_career_actions_action_group_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_career_actions" DROP CONSTRAINT "candidate_career_actions_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_educations" DROP CONSTRAINT "candidate_educations_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_professionals" DROP CONSTRAINT "candidate_professionals_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_professionals" DROP CONSTRAINT "candidate_professionals_group_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_recent_actions" DROP CONSTRAINT "candidate_recent_actions_action_group_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate_recent_actions" DROP CONSTRAINT "candidate_recent_actions_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_party_id_fkey";

-- DropForeignKey
ALTER TABLE "future_promises" DROP CONSTRAINT "future_promises_action_group_id_fkey";

-- DropForeignKey
ALTER TABLE "future_promises" DROP CONSTRAINT "future_promises_party_id_fkey";

-- DropForeignKey
ALTER TABLE "glossary_terms" DROP CONSTRAINT "glossary_terms_glossary_category_id_fkey";

-- DropForeignKey
ALTER TABLE "legislations" DROP CONSTRAINT "legislations_legislation_group_id_fkey";

-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "party_base_topics" DROP CONSTRAINT "party_base_topics_party_id_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_legislation_id_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_option_id_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_party_id_fkey";

-- DropForeignKey
ALTER TABLE "party_members" DROP CONSTRAINT "party_members_party_id_fkey";

-- DropForeignKey
ALTER TABLE "public_opinions" DROP CONSTRAINT "public_opinions_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "recent_actions" DROP CONSTRAINT "recent_actions_action_group_id_fkey";

-- DropForeignKey
ALTER TABLE "recent_actions" DROP CONSTRAINT "recent_actions_party_id_fkey";

-- DropIndex
DROP INDEX "candidate_career_actions_action_group_id_idx";

-- DropIndex
DROP INDEX "candidate_career_actions_candidate_id_order_index_idx";

-- DropIndex
DROP INDEX "candidate_educations_candidate_id_idx";

-- DropIndex
DROP INDEX "candidate_professionals_candidate_id_idx";

-- DropIndex
DROP INDEX "candidate_professionals_group_id_idx";

-- DropIndex
DROP INDEX "candidate_recent_actions_action_group_id_idx";

-- DropIndex
DROP INDEX "candidate_recent_actions_candidate_id_order_index_idx";

-- DropIndex
DROP INDEX "candidates_party_id_idx";

-- DropIndex
DROP INDEX "future_promises_action_group_id_idx";

-- DropIndex
DROP INDEX "future_promises_party_id_order_index_idx";

-- DropIndex
DROP INDEX "glossary_terms_glossary_category_id_idx";

-- DropIndex
DROP INDEX "legislations_legislation_group_id_idx";

-- DropIndex
DROP INDEX "parties_candidate_id_idx";

-- DropIndex
DROP INDEX "party_base_topics_party_id_idx";

-- DropIndex
DROP INDEX "party_legislations_legislation_id_idx";

-- DropIndex
DROP INDEX "party_legislations_option_id_idx";

-- DropIndex
DROP INDEX "party_legislations_party_id_idx";

-- DropIndex
DROP INDEX "party_members_party_id_order_index_idx";

-- DropIndex
DROP INDEX "public_opinions_candidate_id_order_index_idx";

-- DropIndex
DROP INDEX "recent_actions_action_group_id_idx";

-- DropIndex
DROP INDEX "recent_actions_party_id_order_index_idx";

-- AlterTable
ALTER TABLE "candidate_career_actions" DROP COLUMN "action_group_id",
DROP COLUMN "candidate_id",
ADD COLUMN     "action_group_name" TEXT NOT NULL,
ADD COLUMN     "candidate_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "candidate_educations" DROP COLUMN "candidate_id",
ADD COLUMN     "candidate_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "candidate_professionals" DROP COLUMN "candidate_id",
DROP COLUMN "group_id",
ADD COLUMN     "candidate_name" TEXT NOT NULL,
ADD COLUMN     "group_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "candidate_recent_actions" DROP COLUMN "action_group_id",
DROP COLUMN "candidate_id",
ADD COLUMN     "action_group_name" TEXT NOT NULL,
ADD COLUMN     "candidate_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "party_id",
ADD COLUMN     "party_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "future_promises" DROP COLUMN "action_group_id",
DROP COLUMN "party_id",
ADD COLUMN     "action_group_name" TEXT NOT NULL,
ADD COLUMN     "party_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "glossary_terms" DROP COLUMN "glossary_category_id",
ADD COLUMN     "glossary_category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "legislations" DROP COLUMN "legislation_group_id",
ADD COLUMN     "legislation_group_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "parties" DROP COLUMN "candidate_id",
ADD COLUMN     "candidate_name" TEXT;

-- AlterTable
ALTER TABLE "party_base_topics" DROP COLUMN "party_id",
ADD COLUMN     "party_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "party_legislations" DROP COLUMN "legislation_id",
DROP COLUMN "option_id",
DROP COLUMN "party_id",
ADD COLUMN     "legislation_title" TEXT NOT NULL,
ADD COLUMN     "option_display_value" TEXT NOT NULL,
ADD COLUMN     "party_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "party_members" DROP COLUMN "party_id",
ADD COLUMN     "party_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public_opinions" DROP COLUMN "candidate_id",
ADD COLUMN     "candidate_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recent_actions" DROP COLUMN "action_group_id",
DROP COLUMN "party_id",
ADD COLUMN     "action_group_name" TEXT NOT NULL,
ADD COLUMN     "party_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "action_groups_name_key" ON "action_groups"("name");

-- CreateIndex
CREATE INDEX "candidate_career_actions_candidate_name_order_index_idx" ON "candidate_career_actions"("candidate_name", "order_index");

-- CreateIndex
CREATE INDEX "candidate_career_actions_action_group_name_idx" ON "candidate_career_actions"("action_group_name");

-- CreateIndex
CREATE INDEX "candidate_educations_candidate_name_idx" ON "candidate_educations"("candidate_name");

-- CreateIndex
CREATE INDEX "candidate_professionals_candidate_name_idx" ON "candidate_professionals"("candidate_name");

-- CreateIndex
CREATE INDEX "candidate_professionals_group_name_idx" ON "candidate_professionals"("group_name");

-- CreateIndex
CREATE INDEX "candidate_recent_actions_candidate_name_order_index_idx" ON "candidate_recent_actions"("candidate_name", "order_index");

-- CreateIndex
CREATE INDEX "candidate_recent_actions_action_group_name_idx" ON "candidate_recent_actions"("action_group_name");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_name_key" ON "candidates"("name");

-- CreateIndex
CREATE INDEX "candidates_party_name_idx" ON "candidates"("party_name");

-- CreateIndex
CREATE INDEX "future_promises_party_name_order_index_idx" ON "future_promises"("party_name", "order_index");

-- CreateIndex
CREATE INDEX "future_promises_action_group_name_idx" ON "future_promises"("action_group_name");

-- CreateIndex
CREATE UNIQUE INDEX "glossary_categories_name_key" ON "glossary_categories"("name");

-- CreateIndex
CREATE INDEX "glossary_terms_glossary_category_name_idx" ON "glossary_terms"("glossary_category_name");

-- CreateIndex
CREATE UNIQUE INDEX "legislation_groups_name_key" ON "legislation_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "legislation_options_display_value_key" ON "legislation_options"("display_value");

-- CreateIndex
CREATE UNIQUE INDEX "legislations_title_key" ON "legislations"("title");

-- CreateIndex
CREATE INDEX "legislations_legislation_group_name_idx" ON "legislations"("legislation_group_name");

-- CreateIndex
CREATE UNIQUE INDEX "parties_name_key" ON "parties"("name");

-- CreateIndex
CREATE INDEX "parties_candidate_name_idx" ON "parties"("candidate_name");

-- CreateIndex
CREATE INDEX "party_base_topics_party_name_idx" ON "party_base_topics"("party_name");

-- CreateIndex
CREATE INDEX "party_legislations_party_name_idx" ON "party_legislations"("party_name");

-- CreateIndex
CREATE INDEX "party_legislations_legislation_title_idx" ON "party_legislations"("legislation_title");

-- CreateIndex
CREATE INDEX "party_legislations_option_display_value_idx" ON "party_legislations"("option_display_value");

-- CreateIndex
CREATE INDEX "party_members_party_name_order_index_idx" ON "party_members"("party_name", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "professional_groups_name_key" ON "professional_groups"("name");

-- CreateIndex
CREATE INDEX "public_opinions_candidate_name_order_index_idx" ON "public_opinions"("candidate_name", "order_index");

-- CreateIndex
CREATE INDEX "recent_actions_party_name_order_index_idx" ON "recent_actions"("party_name", "order_index");

-- CreateIndex
CREATE INDEX "recent_actions_action_group_name_idx" ON "recent_actions"("action_group_name");

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legislations" ADD CONSTRAINT "legislations_legislation_group_name_fkey" FOREIGN KEY ("legislation_group_name") REFERENCES "legislation_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_legislation_title_fkey" FOREIGN KEY ("legislation_title") REFERENCES "legislations"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_option_display_value_fkey" FOREIGN KEY ("option_display_value") REFERENCES "legislation_options"("display_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_actions" ADD CONSTRAINT "recent_actions_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_actions" ADD CONSTRAINT "recent_actions_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future_promises" ADD CONSTRAINT "future_promises_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future_promises" ADD CONSTRAINT "future_promises_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_professionals" ADD CONSTRAINT "candidate_professionals_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_professionals" ADD CONSTRAINT "candidate_professionals_group_name_fkey" FOREIGN KEY ("group_name") REFERENCES "professional_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_career_actions" ADD CONSTRAINT "candidate_career_actions_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_career_actions" ADD CONSTRAINT "candidate_career_actions_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_recent_actions" ADD CONSTRAINT "candidate_recent_actions_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_recent_actions" ADD CONSTRAINT "candidate_recent_actions_action_group_name_fkey" FOREIGN KEY ("action_group_name") REFERENCES "action_groups"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_opinions" ADD CONSTRAINT "public_opinions_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glossary_terms" ADD CONSTRAINT "glossary_terms_glossary_category_name_fkey" FOREIGN KEY ("glossary_category_name") REFERENCES "glossary_categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
