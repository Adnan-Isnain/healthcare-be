import { IsString, IsNumber, IsArray, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTreatmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  treatmentOptions: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  medications: string[];

  @IsNumber()
  @IsNotEmpty()
  costOfTreatment: number;

  @IsString()
  @IsNotEmpty()
  patientId: string;
} 