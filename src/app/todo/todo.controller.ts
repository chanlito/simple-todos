import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';

import { Auth, AuthUser, isNumber, logger } from '../../common';
import { Todo, User } from '../../entity';
import { InjectCustomReposity } from '../../lib/typeorm';
import { TodoRepository, UserRepository } from '../../repository';
import { CreateTodoDtoIndicative } from './todo.dto';

@ApiUseTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @Inject(EntityManager) private readonly em: EntityManager,
    @InjectCustomReposity(Todo) private readonly todoRepository: TodoRepository,
    @InjectCustomReposity(User) private readonly userRepository: UserRepository
  ) {}

  @Auth('User')
  @Post()
  async create(@Body() body: CreateTodoDtoIndicative) {
    const todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    return this.em.getCustomRepository(TodoRepository).save(todo);
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
  async update() {}

  @Delete(':id')
  async delete() {
    return await this.userRepository.findUserInfo(2);
  }
}
