import { BadRequestException, createRouteParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from '../../entity';

export const TodoFromParam = createRouteParamDecorator(async (args, req: Request) => {
  const todo = await getRepository(Todo).findOneById(req.params.id);
  if (!todo) throw new BadRequestException('Todo was not found.');
  return todo;
});
