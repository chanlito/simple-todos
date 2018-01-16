import { EntityRepository, Repository } from 'typeorm';

import { Todo } from '../entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async findIsDone() {
    return this.findOne({ where: { isDone: true } });
  }

  async findPublicTodosAndCreatorsName({ limit, offset }: { limit: number; offset: number }) {
    return this.createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'u')
      .innerJoinAndSelect('u.profile' , 'p')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    // return this.findAndCount({
    //   relations: ['user', 'user.profile'],
    //   where: { isPublic: true },
    //   take: limit,
    //   skip: offset,
    //   order: {
    //     id: 'DESC'
    //   }
    // });
  }
}
