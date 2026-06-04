-- DropForeignKey
ALTER TABLE "legislations" DROP CONSTRAINT "legislations_legislation_group_name_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_legislation_title_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_option_display_value_fkey";

-- DropForeignKey
ALTER TABLE "party_legislations" DROP CONSTRAINT "party_legislations_party_name_fkey";

-- AddForeignKey
ALTER TABLE "legislations" ADD CONSTRAINT "legislations_legislation_group_name_fkey" FOREIGN KEY ("legislation_group_name") REFERENCES "legislation_groups"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_legislation_title_fkey" FOREIGN KEY ("legislation_title") REFERENCES "legislations"("title") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_option_display_value_fkey" FOREIGN KEY ("option_display_value") REFERENCES "legislation_options"("display_value") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_party_name_fkey" FOREIGN KEY ("party_name") REFERENCES "parties"("name") ON DELETE CASCADE ON UPDATE CASCADE;
