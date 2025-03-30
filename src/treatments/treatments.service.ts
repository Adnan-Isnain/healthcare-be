import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { CreateMedicationDto } from './dto/create-medication.dto';

interface TreatmentSearchParams {
  patientId?: string;
  doctorId?: string;
  startDate?: Date;
  endDate?: Date;
  treatmentOption?: string;
  medication?: string;
}

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

  async searchMedications(query?: string) {
    return this.prisma.medication.findMany({
      where: {
        deletedAt: null,
        ...(query
          ? {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getActiveMedications() {
    return this.prisma.medication.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async searchTreatments(params: TreatmentSearchParams) {
    const {
      patientId,
      doctorId,
      startDate,
      endDate,
      treatmentOption,
      medication,
    } = params;

    return this.prisma.treatment.findMany({
      where: {
        deletedAt: null,
        ...(patientId && { patientId }),
        ...(doctorId && { userId: doctorId }),
        ...(startDate && { date: { gte: startDate } }),
        ...(endDate && { date: { lte: endDate } }),
        ...(treatmentOption && {
          treatmentOptions: {
            has: treatmentOption,
          },
        }),
        ...(medication && {
          medications: {
            has: medication,
          },
        }),
      },
      include: {
        patient: true,
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getTreatmentStatistics(startDate?: Date, endDate?: Date) {
    const where = {
      deletedAt: null,
      ...(startDate && { date: { gte: startDate } }),
      ...(endDate && { date: { lte: endDate } }),
    };

    const [totalTreatments, totalCost, treatmentsByMonth] = await Promise.all([
      this.prisma.treatment.count({ where }),
      this.prisma.treatment.aggregate({
        where,
        _sum: {
          costOfTreatment: true,
        },
      }),
      this.prisma.treatment.groupBy({
        by: ['date'],
        where,
        _count: true,
        _sum: {
          costOfTreatment: true,
        },
        orderBy: {
          date: 'asc',
        },
      }),
    ]);

    return {
      totalTreatments,
      totalCost: totalCost._sum.costOfTreatment || 0,
      treatmentsByMonth,
    };
  }

  async getAllMedications(includeDeleted: boolean = false) {
    const medications = await this.prisma.medication.findMany({
      where: includeDeleted ? {} : { deletedAt: null },
      orderBy: [
        { deletedAt: 'asc' },
        { name: 'asc' },
      ],
    });

    // Get treatment counts separately
    const medicationsWithCounts = await Promise.all(
      medications.map(async (medication) => {
        const treatmentCount = await this.prisma.treatment.count({
          where: {
            medications: {
              has: medication.slug
            },
            deletedAt: null
          }
        });
        
        return {
          ...medication,
          treatmentCount
        };
      })
    );

    return medicationsWithCounts;
  }
}
