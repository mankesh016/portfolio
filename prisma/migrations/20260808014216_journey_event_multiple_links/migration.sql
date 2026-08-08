/*
  Warnings:

  - You are about to drop the column `linkLabel` on the `JourneyEvent` table. All the data in the column will be lost.
  - You are about to drop the column `linkType` on the `JourneyEvent` table. All the data in the column will be lost.
  - You are about to drop the column `linkUrl` on the `JourneyEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JourneyEvent" DROP COLUMN "linkLabel",
DROP COLUMN "linkType",
DROP COLUMN "linkUrl",
ADD COLUMN     "links" JSONB NOT NULL DEFAULT '[]';
