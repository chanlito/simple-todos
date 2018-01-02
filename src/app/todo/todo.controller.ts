import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';

import { Auth, AuthUser, isNumber, logger, Roles } from '../../common';
import { Todo, User } from '../../entity';
import { InjectCustomReposity } from '../../lib/typeorm';
import { TodoRepository } from '../../repository';
import { CreateTodoDtoIndicative, UpdateTodoDto } from './todo.dto';

@ApiUseTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @Inject(EntityManager) private readonly em: EntityManager,
    @InjectCustomReposity(Todo) private readonly todoRepository: TodoRepository
  ) {}

  @Auth(Roles.User)
  @Post()
  async create(@Body() body: CreateTodoDtoIndicative, @AuthUser() authUser: User) {
    const todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    todo.user = authUser;
    return this.em.save(Todo, todo);
  }

  @Get()
  async read(
    @Query('limit', isNumber)
    limit: number = 10,
    @Query('offset', isNumber)
    offset: number = 0,
    @AuthUser() authUser: User
  ) {
    logger.info('Auth User', authUser);
    const todos = await this.todoRepository.find({ take: limit, skip: offset });
    return { data: todos };
  }

  @Get(':id')
  async readOne(
    @Param('id', isNumber)
    id: number
  ) {
    const todo = await this.todoRepository.findOneById(id);
    if (!todo) throw new BadRequestException('Todo was not found.');
    return { data: todo };
  }

  @Put(':id')
  async update(
    @Param('id', isNumber)
    id: number,
    @Body() body: UpdateTodoDto
  ) {
    let todo = await this.todoRepository.findOneById(id);
    if (!todo) throw new BadRequestException('Todo was not found.');
    todo = { ...todo, ...body };
    return this.em.save(Todo, todo);
  }

  @Delete(':id')
  async delete(
    @Param('id', isNumber)
    id: number
  ) {
    let todo = await this.todoRepository.findOneById(id);
    if (!todo) throw new BadRequestException('Todo was not found.');
    await this.todoRepository.deleteById(id);
    return { message: 'OK' };
  }
}
