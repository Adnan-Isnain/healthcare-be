import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { CreateTreatmentOptionDto } from './dto/create-treatment-option.dto';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Permission } from '../auth/rbac/permissions';

@ApiTags('treatments')
@Controller('treatments')
@UseGuards(JwtAuthGuard, RBACGuard)
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @RequirePermissions(Permission.CREATE_TREATMENT)
  @ApiOperation({ summary: 'Create a new treatment' })
  @ApiResponse({ status: 201, description: 'Treatment created successfully' })
  create(@Body() createTreatmentDto: CreateTreatmentDto, @Req() req: Request) {
    return this.treatmentsService.create(createTreatmentDto, req?.user?.['id']);
  }

  @Get()
  @RequirePermissions(Permission.READ_TREATMENT)
  @ApiOperation({ summary: 'Get all treatments' })
  @ApiResponse({ status: 200, description: 'Return all treatments' })
  findAll() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  @RequirePermissions(Permission.READ_TREATMENT)
  @ApiOperation({ summary: 'Get a treatment by id' })
  @ApiResponse({ status: 200, description: 'Return the treatment' })
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Get('patient/:patientId')
  @RequirePermissions(Permission.READ_TREATMENT)
  @ApiOperation({ summary: 'Get all treatments for a patient' })
  @ApiResponse({ status: 200, description: 'Return all treatments for the patient' })
  findByPatientId(@Param('patientId') patientId: string) {
    return this.treatmentsService.findByPatientId(patientId);
  }

  @Patch(':id')
  @RequirePermissions(Permission.UPDATE_TREATMENT)
  @ApiOperation({ summary: 'Update a treatment' })
  @ApiResponse({ status: 200, description: 'Treatment updated successfully' })
  update(@Param('id') id: string, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_TREATMENT)
  @ApiOperation({ summary: 'Delete a treatment' })
  @ApiResponse({ status: 200, description: 'Treatment deleted successfully' })
  remove(@Param('id') id: string) {
    return this.treatmentsService.remove(id);
  }

  // Treatment Options endpoints
  @Post('options')
  @RequirePermissions(Permission.CREATE_TREATMENT_OPTION)
  @ApiOperation({ summary: 'Create a new treatment option' })
  @ApiResponse({ status: 201, description: 'Treatment option created successfully' })
  createTreatmentOption(@Body() createTreatmentOptionDto: CreateTreatmentOptionDto) {
    return this.treatmentsService.createTreatmentOption(createTreatmentOptionDto);
  }

  @Get('options')
  @RequirePermissions(Permission.READ_TREATMENT_OPTION)
  @ApiOperation({ summary: 'Get all treatment options' })
  @ApiResponse({ status: 200, description: 'Return all treatment options' })
  getTreatmentOptions() {
    return this.treatmentsService.getTreatmentOptions();
  }

  @Patch('options/:id')
  @RequirePermissions(Permission.UPDATE_TREATMENT_OPTION)
  @ApiOperation({ summary: 'Update a treatment option' })
  @ApiResponse({ status: 200, description: 'Treatment option updated successfully' })
  updateTreatmentOption(
    @Param('id') id: string,
    @Body() updateTreatmentOptionDto: Partial<CreateTreatmentOptionDto>,
  ) {
    return this.treatmentsService.updateTreatmentOption(id, updateTreatmentOptionDto);
  }

  @Delete('options/:id')
  @RequirePermissions(Permission.DELETE_TREATMENT_OPTION)
  @ApiOperation({ summary: 'Delete a treatment option' })
  @ApiResponse({ status: 200, description: 'Treatment option deleted successfully' })
  removeTreatmentOption(@Param('id') id: string) {
    return this.treatmentsService.removeTreatmentOption(id);
  }

  // Medications endpoints
  @Post('medications')
  @RequirePermissions(Permission.CREATE_MEDICATION)
  @ApiOperation({ summary: 'Create a new medication' })
  @ApiResponse({ status: 201, description: 'Medication created successfully' })
  createMedication(@Body() createMedicationDto: CreateMedicationDto) {
    return this.treatmentsService.createMedication(createMedicationDto);
  }

  @Get('medications')
  @RequirePermissions(Permission.READ_MEDICATION)
  @ApiOperation({ summary: 'Get all medications' })
  @ApiResponse({ status: 200, description: 'Return all medications' })
  getMedications() {
    return this.treatmentsService.getMedications();
  }

  @Patch('medications/:id')
  @RequirePermissions(Permission.UPDATE_MEDICATION)
  @ApiOperation({ summary: 'Update a medication' })
  @ApiResponse({ status: 200, description: 'Medication updated successfully' })
  updateMedication(
    @Param('id') id: string,
    @Body() updateMedicationDto: Partial<CreateMedicationDto>,
  ) {
    return this.treatmentsService.updateMedication(id, updateMedicationDto);
  }

  @Delete('medications/:id')
  @RequirePermissions(Permission.DELETE_MEDICATION)
  @ApiOperation({ summary: 'Delete a medication' })
  @ApiResponse({ status: 200, description: 'Medication deleted successfully' })
  removeMedication(@Param('id') id: string) {
    return this.treatmentsService.removeMedication(id);
  }
}
