/*
  Warnings:

  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetLevels" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "size" "PetSize" NOT NULL,
DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" "PetLevels" NOT NULL,
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "PetLevels" NOT NULL;

-- DropEnum
DROP TYPE "Levels";
