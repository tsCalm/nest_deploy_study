import { User } from '../modules/user/user.et';
import { DataSource, EntityManager } from 'typeorm';

import { passwordHash } from '../modules/utils/hash';
import { join } from 'path';
async function getConnection() {
  const datasource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../modules/**/*.et.js')],
  });
  let connection: DataSource = await datasource.initialize();
  return connection;
}

export const connection = async () => await getConnection();
