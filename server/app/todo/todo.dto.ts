import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'nestjs-extensions';

@Validate({
  rules: {
    title: 'required|string',
    description: 'string'
  },
  messsages: {
    'title.required': 'The {{field}} field is required.'
  }
})
export class CreateTodoDto {
  @ApiModelProperty({ required: true })
  title: string;

  @ApiModelPropertyOptional() description?: string;
}

@Validate({
  rules: {
    title: 'string',
    description: 'string'
  }
})
export class UpdateTodoDto {
  @ApiModelPropertyOptional() title?: string;

  @ApiModelPropertyOptional() description?: string;
}
