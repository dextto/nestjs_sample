import { join } from 'path'
import { ConnectionOptions } from 'typeorm'

import databaseConfig from '@config/databaseConfig';

import { User } from '@user/infra/persistence/entity/user.model';

const DEV_ENV = 'development'

const config = databaseConfig();

const entities = [User];

console.error('__dirname', __dirname)
console.error(join(__dirname, 'src/migrations'))

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
