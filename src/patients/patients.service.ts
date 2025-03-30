import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: {
          id,
          deletedAt: null,
        },
        data: updatePatientDto,
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.patient.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async findByPatientId(patientId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: {
        patientId,
        deletedAt: null,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return patient;
  }
} 