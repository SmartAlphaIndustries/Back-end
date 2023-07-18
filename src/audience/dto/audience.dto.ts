import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';

export class CreateAudienceDto {
  @ApiProperty({
    type: String,
    description: 'The audience title',
  })
  @IsString()
  @IsNotEmpty()
   title: string;

  @ApiProperty({
    type: Array,
    description: 'The audience group',
  })
  @IsArray()
  @IsNotEmpty()
   group: string[];
}

export class AddOrDeleteUserDto {
  @ApiProperty({
    type: String,
    description: 'The user id',
  })
  @IsMongoId()
  @IsNotEmpty()
   userId: string;

  @ApiProperty({
    type: String,
    description: 'The audience id',
  })
  @IsMongoId()
  @IsNotEmpty()
   audienceId: string;
}

export class DeleteAudienceDto {
  @ApiProperty({
    type: String,
    description: 'The audience id',
  })
  @IsMongoId()
  @IsNotEmpty()
   audienceId: string;
}

export const schemasCreateAudienceDto =
  targetConstructorToSchema(CreateAudienceDto);
export const schemasAddOrDeleteUserDto =
  targetConstructorToSchema(AddOrDeleteUserDto);
export const schemaDeleteAudienceDto =
  targetConstructorToSchema(DeleteAudienceDto);
