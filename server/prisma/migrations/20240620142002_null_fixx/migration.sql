/*
  Warnings:

  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backgroundImage` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facebook` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImage` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitter` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "backgroundImage" SET NOT NULL,
ALTER COLUMN "backgroundImage" SET DEFAULT '',
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "facebook" SET NOT NULL,
ALTER COLUMN "facebook" SET DEFAULT '',
ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "instagram" SET DEFAULT '',
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "location" SET DEFAULT '',
ALTER COLUMN "profileImage" SET NOT NULL,
ALTER COLUMN "profileImage" SET DEFAULT '',
ALTER COLUMN "twitter" SET NOT NULL,
ALTER COLUMN "twitter" SET DEFAULT '',
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "website" SET DEFAULT '';
