import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const dbDatasource: DataSourceOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  entities: ['dist/user/entities/user.entity.js'],
  migrations: ['dist/user/migrations/*.js'],
  migrationsTableName: 'user',
};

const dataSource = new DataSource(dbDatasource);
export default dataSource;
