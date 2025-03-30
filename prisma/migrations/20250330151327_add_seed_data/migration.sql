/*
  Warnings:

  - You are about to drop the column `description` on the `Treatment` table. All the data in the column will be lost.
  - You are about to drop the column `medicationsPrescribed` on the `Treatment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `TreatmentOption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `TreatmentOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "description",
DROP COLUMN "medicationsPrescribed",
ADD COLUMN     "medications" TEXT[],
ADD COLUMN     "treatmentOptions" TEXT[];

-- AlterTable
ALTER TABLE "TreatmentOption" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medication_slug_key" ON "Medication"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentOption_slug_key" ON "TreatmentOption"("slug");
