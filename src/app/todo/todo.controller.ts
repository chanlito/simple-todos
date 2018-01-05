import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectRedisClient, OrmCustomRepository, OrmEntityManager, RedisClient } from 'nestjs-extensions';
import { EntityManager } from 'typeorm';
import { LoggerInstance } from 'winston';

import { Auth, AuthUser, isNumber, LoggerToken, Mailer, MailerToken, Roles } from '../../common';
import { Todo, User } from '../../entity';
import { TodoRepository } from '../../repository';
import { TodoFromParam } from './todo.decorator';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@ApiUseTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @Inject(LoggerToken) private readonly logger: LoggerInstance,
    @Inject(MailerToken) private readonly mailer: Mailer,
    @InjectRedisClient() private readonly redisClient: RedisClient,
    @OrmEntityManager() private readonly em: EntityManager,
    @OrmCustomRepository(Todo) private readonly todoRepository: TodoRepository
  ) {}

  @Auth(Roles.User)
  @Post()
  async create(@Body() body: CreateTodoDto, @AuthUser() authUser: User) {
    const todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    todo.user = authUser;
    await this.em.save(Todo, todo);
    this.redisClient.setex('todo', 300, JSON.stringify(todo), (err, reply) => {
      if (err) return this.logger.error('SETEX', err.message);
      this.logger.info('SETEX', 'OK');
    });
    this.mailer.send({
      to: [authUser.email],
      fromEmail: 'simpletodos@mail.com',
      fromName: 'Simple Todos Team',
      subject: 'Thank you for creating a todo.',
      html: `
        <p>Hi there,</p>
        <p>Thank you, your todo is ready to be used.</p>
        <p><b>Simple Todos</b> Team</p>
      `
    });
    return todo;
  }

  @Get()
  async read(
    @Query('limit', isNumber)
    limit: number = 10,
    @Query('offset', isNumber)
    offset: number = 0,
    @AuthUser() authUser: User
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
