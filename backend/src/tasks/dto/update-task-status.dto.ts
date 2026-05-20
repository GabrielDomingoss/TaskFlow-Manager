import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../generated/prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.DONE })
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
