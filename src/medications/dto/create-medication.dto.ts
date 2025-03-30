import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty({ example: 'Paracetamol' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'paracetamol' })
  @IsString()
  @IsNotEmpty()
  slug: string;
} 