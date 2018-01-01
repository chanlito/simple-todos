import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { Validate } from '../../common';

@Validate({
  rules: {
    email: 'required|string|email|max:255',
    password: 'required|string|min:6|max:255',
    firstName: 'required|string|max:255',
    lastName: 'string|max:255'
  }
})
export class RegisterDto {
  @ApiModelProperty({ required: true, type: String })
  email: string;

  @ApiModelProperty({ required: true })
  password: string;

  @ApiModelProperty({ required: true })
  firstName: string;

  @ApiModelPropertyOptional() lastName?: string;
}

@Validate({
  rules: {
    email: 'required|string|email|max:255',
    password: 'required|string|max:255'
  }
})
export class LoginDto {
  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({ required: true })
  password: string;
}
