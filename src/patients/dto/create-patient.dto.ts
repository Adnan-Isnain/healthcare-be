import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;
} 