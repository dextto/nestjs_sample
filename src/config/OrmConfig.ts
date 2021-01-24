import { ConnectionOptions } from 'typeorm'

import databaseConfig from '@config/databaseConfig';

import { User } from '@user/infra/persistence/entity/user.model';
import { AdminUser } from '@user/infra/persistence/entity/admin-user.model';

const DEV_ENV = 'development'

const config = databaseConfig();

const entities = [User, AdminUser];

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.dbName,
  entities,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === DEV_ENV ? 'debug' : 'file',
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  migrations: [
    'dist/src/migrations/*{.ts,.js}',
  ],
  cli: {
    migrationsDir: 'src/migrations',
  }
}

export = connectionOptions;
