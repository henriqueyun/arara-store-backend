import { Sequelize } from 'sequelize-typescript';
import {
  Admin,
  Address,
  Cart,
  Favorite,
  Image,
  Item,
  Order,
  Product,
  User,
} from '../modules/index.entities';
import { Showcase } from '../modules/products/entities/showcase.entity';
import * as DB_CONFIG from '../../config/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        DB_CONFIG[process.env.NODE_ENV] ?? {
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'root',
          database: 'arara-store',
        },
      );

      sequelize.addModels([
        Admin,
        Address,
        Cart,
        Favorite,
        Image,
        Item,
        Order,
        Product,
        Showcase,
        User,
      ]);
      return sequelize;
    },
  },
];
