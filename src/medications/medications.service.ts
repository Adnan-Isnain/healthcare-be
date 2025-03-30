import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto) {
    return this.prisma.medication.create({
      data: createMedicationDto,
    });
  }

  async findAll() {
    return this.prisma.medication.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async search(query?: string) {
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

  async getActive() {
    return this.prisma.medication.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getAll(includeDeleted: boolean = false) {
    return this.prisma.medication.findMany({
      where: includeDeleted ? {} : { deletedAt: null },
      orderBy: [
        { deletedAt: 'asc' },
        { name: 'asc' },
      ],
    });
  }

  async update(id: string, updateMedicationDto: Partial<CreateMedicationDto>) {
    try {
      return await this.prisma.medication.update({
        where: { id },
        data: updateMedicationDto,
      });
    } catch (error) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.medication.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
  }
} 