-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TreatmentOption" ADD COLUMN     "deletedAt" TIMESTAMP(3);
