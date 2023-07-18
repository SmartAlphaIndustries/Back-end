import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';

export class CreateAcceptanceDto {
  @ApiProperty({
    type: String,
    description: "The acceptance's title",
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: "The acceptance's template",
  })
  @IsString()
  template: string;

  @ApiProperty({
    type: String,
    description: "The acceptance's version",
  })
  @IsString()
  version: string;
}

export class UpdateAcceptanceDto extends PartialType(CreateAcceptanceDto) {
  @ApiProperty({
    type: String,
    description: "The updated acceptance's title",
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: "The updated acceptance's template",
  })
  @IsString()
  template: string;

  @ApiProperty({
    type: String,
    description: "The updated acceptance's version",
  })
  @IsString()
  version: string;
}

export const schemaCreateAcceptanceDto = targetConstructorToSchema(CreateAcceptanceDto);
export const schemaUpdateAcceptanceDto = targetConstructorToSchema(UpdateAcceptanceDto);
