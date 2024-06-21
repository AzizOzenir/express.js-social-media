/*
  Warnings:

  - You are about to drop the column `requestCount` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `action` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "requestCount",
ADD COLUMN     "action" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "backgroundImage",
DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "location",
DROP COLUMN "profileImage",
DROP COLUMN "twitter",
DROP COLUMN "website";
