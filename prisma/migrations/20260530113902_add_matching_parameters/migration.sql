-- CreateEnum
CREATE TYPE "MatchingParameterType" AS ENUM ('categorical', 'scale', 'semantic');

-- CreateTable
CREATE TABLE "matching_parameters" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" "MatchingParameterType" NOT NULL,
    "display_order" INTEGER NOT NULL,
    "show_to_user" BOOLEAN NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "matching_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matching_parameter_options" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parameter_name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "numeric_value" DOUBLE PRECISION,
    "vector_value" TEXT,

    CONSTRAINT "matching_parameter_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voters_matching_parameter_values" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "voter_profile_id" UUID NOT NULL,
    "parameter_name" TEXT NOT NULL,
    "option_label" TEXT,
    "text_value" TEXT,
    "embedding_cache" DOUBLE PRECISION[],
    "embedding_date" TIMESTAMP(3),
    "has_opinion" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "voters_matching_parameter_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates_matching_parameter_values" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_name" TEXT NOT NULL,
    "parameter_name" TEXT NOT NULL,
    "option_label" TEXT,
    "text_value" TEXT,
    "embedding_cache" DOUBLE PRECISION[],
    "embedding_date" TIMESTAMP(3),
    "has_opinion" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "candidates_matching_parameter_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "matching_parameters_name_key" ON "matching_parameters"("name");

-- CreateIndex
CREATE INDEX "matching_parameter_options_parameter_name_idx" ON "matching_parameter_options"("parameter_name");

-- CreateIndex
CREATE UNIQUE INDEX "matching_parameter_options_parameter_name_label_key" ON "matching_parameter_options"("parameter_name", "label");

-- CreateIndex
CREATE INDEX "voters_matching_parameter_values_voter_profile_id_idx" ON "voters_matching_parameter_values"("voter_profile_id");

-- CreateIndex
CREATE INDEX "voters_matching_parameter_values_parameter_name_idx" ON "voters_matching_parameter_values"("parameter_name");

-- CreateIndex
CREATE UNIQUE INDEX "voters_matching_parameter_values_voter_profile_id_parameter_key" ON "voters_matching_parameter_values"("voter_profile_id", "parameter_name");

-- CreateIndex
CREATE INDEX "candidates_matching_parameter_values_candidate_name_idx" ON "candidates_matching_parameter_values"("candidate_name");

-- CreateIndex
CREATE INDEX "candidates_matching_parameter_values_parameter_name_idx" ON "candidates_matching_parameter_values"("parameter_name");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_matching_parameter_values_candidate_name_paramet_key" ON "candidates_matching_parameter_values"("candidate_name", "parameter_name");

-- AddForeignKey
ALTER TABLE "matching_parameter_options" ADD CONSTRAINT "matching_parameter_options_parameter_name_fkey" FOREIGN KEY ("parameter_name") REFERENCES "matching_parameters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voters_matching_parameter_values" ADD CONSTRAINT "voters_matching_parameter_values_voter_profile_id_fkey" FOREIGN KEY ("voter_profile_id") REFERENCES "voter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voters_matching_parameter_values" ADD CONSTRAINT "voters_matching_parameter_values_parameter_name_fkey" FOREIGN KEY ("parameter_name") REFERENCES "matching_parameters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voters_matching_parameter_values" ADD CONSTRAINT "voters_matching_parameter_values_parameter_name_option_lab_fkey" FOREIGN KEY ("parameter_name", "option_label") REFERENCES "matching_parameter_options"("parameter_name", "label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates_matching_parameter_values" ADD CONSTRAINT "candidates_matching_parameter_values_candidate_name_fkey" FOREIGN KEY ("candidate_name") REFERENCES "candidates"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates_matching_parameter_values" ADD CONSTRAINT "candidates_matching_parameter_values_parameter_name_fkey" FOREIGN KEY ("parameter_name") REFERENCES "matching_parameters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates_matching_parameter_values" ADD CONSTRAINT "candidates_matching_parameter_values_parameter_name_option_fkey" FOREIGN KEY ("parameter_name", "option_label") REFERENCES "matching_parameter_options"("parameter_name", "label") ON DELETE RESTRICT ON UPDATE CASCADE;
