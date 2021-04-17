/*
  Warnings:

  - Added the required column `name` to the `recipe_sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipe_sections" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "description" VARCHAR(255) NOT NULL;
