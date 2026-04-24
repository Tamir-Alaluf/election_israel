-- AlterTable
ALTER TABLE "parties" ADD COLUMN IF NOT EXISTS "chart_color" TEXT;

-- AlterTable
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "voice_pattern" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "security_approach" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "economic_approach" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "leadership_style" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "haredi_gov" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "arab_gov" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "likud_notes" TEXT;
