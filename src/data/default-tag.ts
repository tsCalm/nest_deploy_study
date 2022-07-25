import { Tag } from '../modules/tag/tag.et';
import { DataSource, EntityManager } from 'typeorm';

import { passwordHash } from '../modules/utils/hash';
import { join } from 'path';

export const defaultTag = async () => {
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
  const tagList = [
    {
      id: 1,
      title: 'Design',
      color: 'EC4899',
    },
    { id: 2, title: 'BackEnd', color: 'EAB308' },
    { id: 3, title: 'FrontEnd', color: '2563EB' },
    { id: 3, title: 'Done', color: '22C55E' },
  ];
  await connection.manager.getRepository(Tag).save(tagList);
};
