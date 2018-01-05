import { Logger } from '@nestjs/common';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { getRepositoryToken } from './typeorm.utils';

const logger = new Logger('TypeOrmModule');

export function createTypeOrmProviders(options: CreateTypeOrmProviders) {
  const connectionProvider = {
    provide: Connection,
    useFactory: async () => {
      const connection = await createConnection(options.connectionOptions).catch(e => {
        console.error(e);
        process.exit(1);
      });
      logger.log('Database connected');
      return connection;
    }
  };
  const entityManagerProvider = {
    provide: `EntityManager`,
    useFactory: (connection: Connection) => connection.manager,
    inject: [Connection]
  };

  const getRepository: any = (connection: Connection, entity) =>
    connection.options.type === 'mongodb' ? connection.getMongoRepository(entity) : connection.getRepository(entity);
  const repositories = (options.entities || []).map(entity => ({
    provide: getRepositoryToken(entity),
    useFactory: (connection: Connection) => getRepository(connection, entity),
    inject: [Connection]
  }));

  const getCustomReposity: any = (connection: Connection, repository) => connection.getCustomRepository(repository);
  const customRepositories = (options.customRepositories || []).map(repository => ({
    provide: `${repository.name.split('Repository')[0]}CustomRepository`,
    useFactory: (connection: Connection) => getCustomReposity(connection, repository),
    inject: [Connection]
  }));

  return [connectionProvider, entityManagerProvider, ...repositories, ...customRepositories];
}

export interface CreateTypeOrmProviders {
  entities?: Function[];
  customRepositories?: Function[];
  connectionOptions: ConnectionOptions;
}
