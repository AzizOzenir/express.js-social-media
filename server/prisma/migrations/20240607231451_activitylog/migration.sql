/*
  Warnings:

  - You are about to drop the column `action` on the `ActivityLog` table. All the data in the column will be lost.
  - Added the required column `requestCount` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "action",
ADD COLUMN     "requestCount" INTEGER NOT NULL;
