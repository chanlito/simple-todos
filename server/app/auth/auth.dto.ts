import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'nestjs-extensions';

@Validate({
  rules: {
    email: 'required|string|email|unique_email|max:255',
    password: 'required|string|min:6|max:255',
    firstName: 'required|string|max:255',
    lastName: 'string|max:255'
  }
})
export class RegisterDto {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;

  @ApiModelProperty()
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
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;
}
