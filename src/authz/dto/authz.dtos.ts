import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';

let minReasonableYear = 1900
let maxReasonableYear = 2030

export class SignUpDto {
  @ApiProperty({
    type: String,
    description: "The user's names",
  })
  @IsString()
  @IsNotEmpty()
  readonly names: string;

  @ApiProperty({
    type: String,
    description: "The user's maternal surname",
  })
  @IsString()
  @IsOptional()
  readonly maternalSurname?: string;

  @ApiProperty({
    type: String,
    description: "The user's paternal surname",
  })
  @IsString()
  @IsNotEmpty()
  readonly paternalSurname: string;

  @ApiProperty({
    type: String,
    description: "The user's email",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: Number,
    description: "The user's birthday full year",
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(minReasonableYear)
  @Max(maxReasonableYear)
  readonly fullYear: number;

  @ApiProperty({
    type: Number,
    description: "The user's birthday month",
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(11)
  readonly month: number;

  @ApiProperty({
    type: Number,
    description: "The user's birthday day",
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(31)
  readonly day: number;

  @ApiProperty({
    type: String,
    description: "The user's recovery email",
  })
  @IsString()
  @IsOptional()
  readonly recoveryEmail?: string;

  @ApiProperty({
    type: String,
    description: "The user's phone",
  })
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({
    type: String,
    description: "The user's city",
  })
  @IsString()
  @IsOptional()
  readonly city?: string;

  @ApiProperty({
    type: String,
    description: "The user's country",
  })
  @IsString()
  @IsOptional()
  readonly country?: string;

  @ApiProperty({
    type: String,
    description: "The user's username",
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: "The user's avatar",
  })
  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({
    type: String,
    description: "The acceptanceId of an acceptance document",
  })
  @IsMongoId()
  readonly acceptance: string;

}

export const schemas = targetConstructorToSchema(SignUpDto);
