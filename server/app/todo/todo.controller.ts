import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import {
  Auth,
  AuthUser,
  InjectCustomRepository,
  InjectEntityManager,
  InjectModel,
  InjectSequelize
} from 'nestjs-extensions';
import { Sequelize } from 'sequelize-typescript';
import { EntityManager } from 'typeorm';

import { isNumber, Roles } from '../../common';
import { Todo, User } from '../../entity';
import { Todo as T } from '../../model';
import { TodoRepository } from '../../repository';
import { ApplicationGateway } from '../app.gateway';
import { TodoFromParam } from './todo.decorator';
import { CreateMultipleTodoDto, CreateTodoDto, UpdateTodoDto } from './todo.dto';

@ApiUseTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @InjectModel(T) private readonly todoModel: typeof T,
    @InjectSequelize() private readonly db: Sequelize,
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

    // inform everyone
    if (todo.isPublic) {
      this.appGateway.io.emit('todoCreated', {
        createdBy: authUser.profile.fullName
      });
    }
    return todo;
  }

  @Post('multiple')
  async createMultipleTodo(@Body() body: CreateMultipleTodoDto, @AuthUser() authUser: User) {
    return this.db.transaction(async t => {
      const todos = await this.todoModel.bulkCreate(body.payload);
      return todos;
    });
  }

  @Auth(Roles.User)
  @Get()
  async read(
    @Query('limit', isNumber)
    limit: number = 10,
    @Query('offset', isNumber)
    offset: number = 0
  ) {
    const [todos, total] = await this.todoRepository.findPublicTodosAndCreatorsName({ limit, offset });
    return { data: todos, metadata: { limit, offset, total } };
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
