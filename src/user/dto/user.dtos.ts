import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'The id user',
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export const schemas = targetConstructorToSchema(UserDto);
