import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RBACGuard } from '../auth/guards/rbac.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Permission } from '../auth/rbac/permissions';

@ApiTags('medications')
@Controller('medications')
@UseGuards(JwtAuthGuard, RBACGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @RequirePermissions(Permission.CREATE_MEDICATION)
  @ApiOperation({ summary: 'Create a new medication' })
  @ApiResponse({ status: 201, description: 'Medication created successfully' })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  @RequirePermissions(Permission.READ_MEDICATION)
  @ApiOperation({ summary: 'Get all medications' })
  @ApiResponse({ status: 200, description: 'Return all medications' })
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get('search')
  @RequirePermissions(Permission.READ_MEDICATION)
  @ApiOperation({ summary: 'Search medications by name' })
  @ApiResponse({ status: 200, description: 'Return matching medications' })
  @ApiQuery({ name: 'query', required: false, description: 'Search query for medication name' })
  search(@Query('query') query?: string) {
    return this.medicationsService.search(query);
  }

  @Get('active')
  @RequirePermissions(Permission.READ_MEDICATION)
  @ApiOperation({ summary: 'Get all active medications' })
  @ApiResponse({ status: 200, description: 'Return all active medications' })
  getActive() {
    return this.medicationsService.getActive();
  }

  @Get('all')
  @RequirePermissions(Permission.READ_ALL_MEDICATIONS)
  @ApiOperation({ summary: 'Get all medications including deleted ones (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return all medications including deleted ones' })
  @ApiQuery({ name: 'includeDeleted', required: false, description: 'Include deleted medications' })
  getAll(@Query('includeDeleted') includeDeleted: boolean = false) {
    return this.medicationsService.getAll(includeDeleted);
  }

  @Patch(':id')
  @RequirePermissions(Permission.UPDATE_MEDICATION)
  @ApiOperation({ summary: 'Update a medication' })
  @ApiResponse({ status: 200, description: 'Medication updated successfully' })
  update(@Param('id') id: string, @Body() updateMedicationDto: Partial<CreateMedicationDto>) {
    return this.medicationsService.update(id, updateMedicationDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_MEDICATION)
  @ApiOperation({ summary: 'Delete a medication' })
  @ApiResponse({ status: 200, description: 'Medication deleted successfully' })
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(id);
  }
} 