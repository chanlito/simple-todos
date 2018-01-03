import { ReflectMetadata } from '@nestjs/common';

import { VALIDATE_META_KEY } from './indicative.constants';
import { ValidateOptions } from './indicative.interfaces';

export function Validate(options: ValidateOptions): ClassDecorator {
  return ReflectMetadata(VALIDATE_META_KEY, options);
}
