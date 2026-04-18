/*
  Warnings:

  - You are about to drop the column `base_topic_id` on the `base_topic_options` table. All the data in the column will be lost.
  - You are about to drop the column `base_topic_id` on the `party_base_topics` table. All the data in the column will be lost.
  - You are about to drop the column `base_topic_option_id` on the `party_base_topics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[base_topic_title,option_display_value]` on the table `base_topic_options` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `base_topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `base_topic_title` to the `base_topic_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_topic_option_display_value` to the `party_base_topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_topic_title` to the `party_base_topics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "base_topic_options" DROP CONSTRAINT "base_topic_options_base_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "party_base_topics" DROP CONSTRAINT "party_base_topics_base_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "party_base_topics" DROP CONSTRAINT "party_base_topics_base_topic_option_id_fkey";

-- DropIndex
DROP INDEX "base_topic_options_base_topic_id_idx";

-- DropIndex
DROP INDEX "party_base_topics_base_topic_id_idx";

-- DropIndex
DROP INDEX "party_base_topics_base_topic_option_id_idx";

-- AlterTable
ALTER TABLE "base_topic_options" DROP COLUMN "base_topic_id",
ADD COLUMN     "base_topic_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "party_base_topics" DROP COLUMN "base_topic_id",
DROP COLUMN "base_topic_option_id",
ADD COLUMN     "base_topic_option_display_value" TEXT NOT NULL,
ADD COLUMN     "base_topic_title" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "base_topic_options_base_topic_title_idx" ON "base_topic_options"("base_topic_title");

-- CreateIndex
CREATE UNIQUE INDEX "base_topic_options_base_topic_title_option_display_value_key" ON "base_topic_options"("base_topic_title", "option_display_value");

-- CreateIndex
CREATE UNIQUE INDEX "base_topics_title_key" ON "base_topics"("title");

-- CreateIndex
CREATE INDEX "party_base_topics_base_topic_title_idx" ON "party_base_topics"("base_topic_title");

-- CreateIndex
CREATE INDEX "party_base_topics_base_topic_option_display_value_idx" ON "party_base_topics"("base_topic_option_display_value");

-- AddForeignKey
ALTER TABLE "base_topic_options" ADD CONSTRAINT "base_topic_options_base_topic_title_fkey" FOREIGN KEY ("base_topic_title") REFERENCES "base_topics"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_base_topic_title_fkey" FOREIGN KEY ("base_topic_title") REFERENCES "base_topics"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_base_topic_title_base_topic_option_displ_fkey" FOREIGN KEY ("base_topic_title", "base_topic_option_display_value") REFERENCES "base_topic_options"("base_topic_title", "option_display_value") ON DELETE RESTRICT ON UPDATE CASCADE;
