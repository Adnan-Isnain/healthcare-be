import { IsArray, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTreatmentDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsDate()
  @Type(() => Date)
  dateOfTreatment: Date;

  @IsArray()
  @IsString({ each: true })
  treatmentDescription: string[];

  @IsArray()
  @IsString({ each: true })
  medicationsPrescribed: string[];

  @IsNumber()
  @IsPositive()
  costOfTreatment: number;
} 