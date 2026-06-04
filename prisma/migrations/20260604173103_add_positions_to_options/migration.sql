/*
  Warnings:

  - A unique constraint covering the columns `[parameter_name,position]` on the table `matching_parameter_options` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `matching_parameter_options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matching_parameter_options" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "matching_parameter_options_parameter_name_position_key" ON "matching_parameter_options"("parameter_name", "position");
