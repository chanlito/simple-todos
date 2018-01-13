import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Auth, AuthUser, InjectCustomRepository, InjectEntityManager, InjectLogger, Logger } from 'nestjs-extensions';
import { EntityManager } from 'typeorm';

import { isNumber, Roles } from '../../common';
import { Todo, User } from '../../entity';
import { TodoRepository } from '../../repository';
import { ApplicationGateway } from '../app.gateway';
import { TodoFromParam } from './todo.decorator';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@ApiUseTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @InjectLogger() private readonly logger: Logger,
    @InjectEntityManager() private readonly em: EntityManager,
    @InjectCustomRepository(Todo) private readonly todoRepository: TodoRepository,
    private readonly appGateway: ApplicationGateway
  ) {}

  @Auth(Roles.User)
  @Post()
  async create(@Body() body: CreateTodoDto, @AuthUser() authUser: User) {
    const todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    todo.user = authUser;
    await this.em.save(Todo, todo);
    this.appGateway.io.emit('todoCreated', { todo, createdBy: authUser.profile.fullName });
    return todo;
  }

  @Auth(Roles.User)
  @Get()
  async read(
    @Query('limit', isNumber)
    limit: number = 10,
    @Query('offset', isNumber)
    offset: number = 0,
    @AuthUser({ required: true })
    authUser?: User
  ) {
    this.logger.info('Auth User', authUser);
    const todos = await this.todoRepository.find({ take: limit, skip: offset });
    return { data: todos };
  }

  @Get(':id')
  async readOne(
    @Param('id', isNumber)
    id: number,
    @TodoFromParam() todo: Todo
  ) {
    return { data: todo };
  }

  @Put(':id')
  async update(
    @Param('id', isNumber)
    id: number,
    @Body() body: UpdateTodoDto,
    @TodoFromParam() todo: Todo
  ) {
    todo = { ...todo, ...body };
    return this.em.save(Todo, todo);
  }

  @Delete(':id')
  async delete(
    @Param('id', isNumber)
    id: number,
    @TodoFromParam() todo: Todo
  ) {
    await this.todoRepository.deleteById(id);
    return { message: 'OK' };
  }
}
