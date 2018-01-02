import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findUserInfo(
    args: number | { id?: number; role?: string; firstName?: string }
  ): Promise<Pick<Partial<User>, 'id'> | undefined> {
    const opts = typeof args === 'number' ? { id: args } : args;
    return (
      this.manager
        .createQueryBuilder()
        // .select(['u.id', 'u.email', 'r.id', 'r.name'])
        .from(User, 'u')
        .innerJoin('u.profile', 'p')
        .where('u.id IS NOT NULL')
        .andWhere(opts.id ? `u.id = :id` : 'true', { id: opts.id })
        .andWhere(opts.firstName ? `u.firstName like :firstName` : 'true', { firstName: `%${opts.firstName}%` })
        .limit(1)
        .getOne()
    );

    // console.log('data', data);

    // const obj: any = { role: {} };

    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const keyName = key.split('_')[1];
    //     if (key.startsWith('u_')) obj[keyName] = data[key];
    //     if (key.startsWith('r_')) obj.role[keyName] = data[key];
    //   }
    // }

    // console.log('obj', obj);

    // // const role = mapKeys(data, (value, key) => key.includes('r_'));
    // return { ...obj };
  }
}
