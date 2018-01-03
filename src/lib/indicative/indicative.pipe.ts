import { ArgumentMetadata, Pipe, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Messages, validateAll } from 'indicative';

import { VALIDATE_META_KEY } from './indicative.constants';
import { ValidateOptions } from './indicative.interfaces';

@Pipe()
export class IndicativePipe implements PipeTransform<any> {
  constructor(private readonly defaultMessages: Messages = {}, private readonly reflector: Reflector) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const validateOptions = this.reflector.get<ValidateOptions>(VALIDATE_META_KEY, metadata.metatype);
    if (value && validateOptions) {
      validateOptions.messsages = { ...this.defaultMessages, ...validateOptions.messsages };
      await validateAll(value, validateOptions.rules, validateOptions.messsages).catch(errors => {
        throw new UnprocessableEntityException({ message: 'Validation Failed.', errors });
      });
    }
    return value;
  }
}
