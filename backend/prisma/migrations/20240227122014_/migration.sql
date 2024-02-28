/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `bidderId` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_buyerId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "buyerId",
ADD COLUMN     "bidderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
