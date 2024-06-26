/*
  Warnings:

  - You are about to alter the column `postal_code` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `username` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `first_name` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `last_name` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `first_name` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `last_name` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[username]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "customer_username_key" ON "customer"("username");
