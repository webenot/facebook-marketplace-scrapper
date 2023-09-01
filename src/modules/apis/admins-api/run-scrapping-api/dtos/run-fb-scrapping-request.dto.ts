import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RunFbScrappingRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Path for scrapping',
    example: '/telaviv/apartments-for-rent',
  })
  @IsString()
  path: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Does path for scrapping contains list',
    example: true,
  })
  @IsBoolean()
  isList: boolean;

  @ApiProperty({
    type: 'number',
    description: 'Scroll pages',
    example: 5,
  })
  @IsNumber()
  scanPages: number;
}
