-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_cargoId_fkey";

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
