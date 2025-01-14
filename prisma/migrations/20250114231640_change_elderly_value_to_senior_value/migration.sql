/*
  Warnings:

  - The values [ELDERLY] on the enum `PetAge` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetAge_new" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "PetAge_new" USING ("age"::text::"PetAge_new");
ALTER TYPE "PetAge" RENAME TO "PetAge_old";
ALTER TYPE "PetAge_new" RENAME TO "PetAge";
DROP TYPE "PetAge_old";
COMMIT;
