import { ArgumentMetadata, Pipe, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { extend, Messages, validateAll } from 'indicative';

import { VALIDATE_META_KEY } from './indicative.constants';
import { ValidateOptions } from './indicative.interfaces';

@Pipe()
export class IndicativePipe implements PipeTransform<any> {
  constructor(private readonly config: IndicativePipeConfiguration, private readonly reflector: Reflector) {
    if (!this.config) this.config = { defaultMessages: {}, customRules: {} };
    // extend indicative default rules
    Object.keys(this.config.customRules).forEach(i => {
      const rule = this.config.customRules[i];
      extend(i, rule);
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const validateOptions = this.reflector.get<ValidateOptions>(VALIDATE_META_KEY, metadata.metatype);
    if (value && validateOptions) {
      // customize message
      validateOptions.messsages = { ...this.config.defaultMessages, ...validateOptions.messsages };
      await validateAll(value, validateOptions.rules, validateOptions.messsages).catch(errors => {
        throw new UnprocessableEntityException({ message: 'Validation Failed.', errors });
      });
    }
    return value;
  }
}

export interface IndicativePipeConfiguration {
  defaultMessages: Messages;
  customRules: {
    [x: string]: (data: any, field: string, message: string, args: any[], get: Function) => Promise<string>;
  };
}
