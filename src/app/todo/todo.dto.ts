import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Validate } from '../../common';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'The title field is required.' })
  @IsString({ message: 'The title field must be a string.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'The description field must be a string.' })
  description?: string;
}

@Validate({
  rules: {
    title: 'required|string',
    description: 'string'
  },
  messsages: {
    'title.required': 'The {{field}} field is required.'
  }
})
export class CreateTodoDtoIndicative {
  title: string;
  description?: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'The title field must be a string.' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'The description field must be a string.' })
  description?: string;
}
