export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    dbName: process.env.DATABASE_DB_NAME || 'test',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,
  }
});