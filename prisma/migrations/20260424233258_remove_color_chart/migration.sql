/*
  Warnings:

  - You are about to drop the column `chart_color` on the `parties` table. All the data in the column will be lost.

*/
-- AlterTable
-- chart_color is added later in 20260425000000_party_chart_candidate_profile; this
-- migration runs first in timestamp order, so the column may not exist yet on a clean replay.
ALTER TABLE "parties" DROP COLUMN IF EXISTS "chart_color";
