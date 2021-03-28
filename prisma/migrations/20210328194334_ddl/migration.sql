-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('LIKE', 'VIEW');

-- CreateTable
CREATE TABLE "users" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "facebook_id" VARCHAR(100),
    "google_id" VARCHAR(100),
    "password_hash" VARCHAR(100),
    "picture_url" VARCHAR(255),
    "birth_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "preparation_time" INTEGER NOT NULL,
    "owner_id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_images" (
    "id" CHAR(36) NOT NULL,
    "recipe_id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_sections" (
    "id" CHAR(36) NOT NULL,
    "order" INTEGER NOT NULL,
    "recipe_id" CHAR(36) NOT NULL,
    "super_section_id" CHAR(36),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_directions" (
    "id" CHAR(36) NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "section_id" CHAR(36) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" CHAR(36) NOT NULL,
    "order" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "section_id" CHAR(36) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_actions" (
    "type" "ActionType" NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "recipe_id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id","recipe_id","type")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeCategory" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryHierarchy" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_sections_super_section_id_unique" ON "recipe_sections"("super_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeCategory_AB_unique" ON "_RecipeCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeCategory_B_index" ON "_RecipeCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryHierarchy_AB_unique" ON "_CategoryHierarchy"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryHierarchy_B_index" ON "_CategoryHierarchy"("B");

-- AddForeignKey
ALTER TABLE "recipes" ADD FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_images" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_sections" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_sections" ADD FOREIGN KEY ("super_section_id") REFERENCES "recipe_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_directions" ADD FOREIGN KEY ("section_id") REFERENCES "recipe_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD FOREIGN KEY ("section_id") REFERENCES "recipe_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_actions" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_actions" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeCategory" ADD FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeCategory" ADD FOREIGN KEY ("B") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryHierarchy" ADD FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryHierarchy" ADD FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
