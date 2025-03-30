import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Permission } from '../auth/rbac/permissions';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RBACGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @RequirePermissions(Permission.CREATE_PATIENT)
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created successfully' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @RequirePermissions(Permission.READ_PATIENT)
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @RequirePermissions(Permission.READ_PATIENT)
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiResponse({ status: 200, description: 'Return patient by ID' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Get('patientId/:patientId')
  @RequirePermissions(Permission.READ_PATIENT)
  @ApiOperation({ summary: 'Get patient by patient ID' })
  @ApiResponse({ status: 200, description: 'Return patient by patient ID' })
  findByPatientId(@Param('patientId') patientId: string) {
    return this.patientsService.findByPatientId(patientId);
  }

  @Patch(':id')
  @RequirePermissions(Permission.UPDATE_PATIENT)
  @ApiOperation({ summary: 'Update patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient updated successfully' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_PATIENT)
  @ApiOperation({ summary: 'Delete patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient deleted successfully' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
} 