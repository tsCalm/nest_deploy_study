import { User } from '../modules/user/user.et';
import { DataSource, EntityManager } from 'typeorm';

import { passwordHash } from '../modules/utils/hash';
import { join } from 'path';

export const defaultUser = async () => {
  const datasource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../modules/**/*.et.js')],
  });
  let connection = await datasource.initialize();

  const users = await connection.manager.getRepository(User).find({
    where: [
      {
        email: process.env.USER_1_EMAIL,
      },
      {
        email: process.env.USER_2_EMAIL,
      },
      {
        email: process.env.USER_3_EMAIL,
      },
      {
        email: process.env.USER_4_EMAIL,
      },
    ],
  });
  if (users.length === 0) {
    const createUserList = [];
    const salt = 10;
    for (let i = 1; i < 5; i++) {
      const user = {
        id: i,
        name: process.env[`USER_${i}_NAME`],
        email: process.env[`USER_${i}_EMAIL`],
        position: process.env[`USER_${i}_POSITION`],
        password: await passwordHash(process.env[`USER_${i}_PASSWORD`]),
      };
      const promiseUser = connection.manager.getRepository(User).save(user);
      createUserList.push(promiseUser);
    }
    await Promise.all(createUserList);
  }
};
