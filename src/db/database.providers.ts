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

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let sequelize;

      if (process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
          dialect: 'postgres',
          dialectOptions: { ssl: {} },
        });
      } else {
        sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'root',
          database: 'arara-store',
        });
      }

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
