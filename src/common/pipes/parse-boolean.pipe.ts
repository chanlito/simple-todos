import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';

@Pipe()
export class ParseBooleanPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    return !!value;
  }
}
