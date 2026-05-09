/*
  Warnings:

  - You are about to drop the column `arab_gov` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `economic_approach` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `haredi_gov` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `leadership_style` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `likud_notes` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `security_approach` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `voice_pattern` on the `candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "arab_gov",
DROP COLUMN "economic_approach",
DROP COLUMN "haredi_gov",
DROP COLUMN "leadership_style",
DROP COLUMN "likud_notes",
DROP COLUMN "security_approach",
DROP COLUMN "voice_pattern";
