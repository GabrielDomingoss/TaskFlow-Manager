import { ApiProperty } from '@nestjs/swagger';
import { Priority, TaskStatus } from '../../../generated/prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Criar Dashboard' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Implementar dashboard principal do Taskflow' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: '2026-05-30T00:00:00.000Z' })
  @IsDateString()
  dueDate!: string;

  @ApiProperty({ enum: Priority, example: Priority.HIGH })
  @IsEnum(Priority)
  priority!: Priority;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @ApiProperty({ example: 'uuid-do-usuario' })
  @IsUUID('4')
  userId!: string;

  @ApiProperty({ example: 'uuid-da-categoria', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds!: string[];
}
