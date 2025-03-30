import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createTreatmentDto: CreateTreatmentDto, userId: string) {
    // Verify that all treatment options and medications exist
    const treatmentOptions = await this.prisma.treatmentOption.findMany({
      where: {
        slug: { in: createTreatmentDto.treatmentOptions },
        deletedAt: null,
      },
    });

    const medications = await this.prisma.medication.findMany({
      where: {
        slug: { in: createTreatmentDto.medications },
        deletedAt: null,
      },
    });

    if (treatmentOptions.length !== createTreatmentDto.treatmentOptions.length) {
      throw new NotFoundException('One or more treatment options not found');
    }

    if (medications.length !== createTreatmentDto.medications.length) {
      throw new NotFoundException('One or more medications not found');
    }

    return this.prisma.treatment.create({
      data: {
        ...createTreatmentDto,
        userId,
      },
      include: {
        patient: true,
      },
    });
  }

  async findAll() {
    return this.prisma.treatment.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        patient: true,
      },
    });
  }

  async findOne(id: string) {
    const treatment = await this.prisma.treatment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        patient: true,
      },
    });

    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }

    return treatment;
  }

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    try {
      if (updateTreatmentDto.treatmentOptions) {
        const treatmentOptions = await this.prisma.treatmentOption.findMany({
          where: {
            slug: { in: updateTreatmentDto.treatmentOptions },
            deletedAt: null,
          },
        });

        if (treatmentOptions.length !== updateTreatmentDto.treatmentOptions.length) {
          throw new NotFoundException('One or more treatment options not found');
        }
      }

      if (updateTreatmentDto.medications) {
        const medications = await this.prisma.medication.findMany({
          where: {
            slug: { in: updateTreatmentDto.medications },
            deletedAt: null,
          },
        });

        if (medications.length !== updateTreatmentDto.medications.length) {
          throw new NotFoundException('One or more medications not found');
        }
      }

      return await this.prisma.treatment.update({
        where: {
          id,
          deletedAt: null,
        },
        data: updateTreatmentDto,
        include: {
          patient: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.treatment.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
        include: {
          patient: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }
  }

  async findByPatientId(patientId: string) {
    return this.prisma.treatment.findMany({
      where: {
        patientId,
        deletedAt: null,
      },
      include: {
        patient: true,
      },
    });
  }

  // Treatment Options CRUD
  async createTreatmentOption(createTreatmentOptionDto: CreateTreatmentOptionDto) {
    return this.prisma.treatmentOption.create({
      data: createTreatmentOptionDto,
    });
  }

  async getTreatmentOptions() {
    return this.prisma.treatmentOption.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async updateTreatmentOption(id: string, updateTreatmentOptionDto: Partial<CreateTreatmentOptionDto>) {
    return this.prisma.treatmentOption.update({
      where: { id },
      data: updateTreatmentOptionDto,
    });
  }

  async removeTreatmentOption(id: string) {
    return this.prisma.treatmentOption.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  // Medications CRUD
  async createMedication(createMedicationDto: CreateMedicationDto) {
    return this.prisma.medication.create({
      data: createMedicationDto,
    });
  }

  async getMedications() {
    return this.prisma.medication.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async updateMedication(id: string, updateMedicationDto: Partial<CreateMedicationDto>) {
    return this.prisma.medication.update({
      where: { id },
      data: updateMedicationDto,
    });
  }

  async removeMedication(id: string) {
    return this.prisma.medication.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
