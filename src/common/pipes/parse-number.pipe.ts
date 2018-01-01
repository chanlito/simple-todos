import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';

@Pipe()
export class ParseNumberPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = +value;
    return isNaN(val) ? undefined : val;
  }
}
