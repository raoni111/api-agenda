import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { resolve } from 'path';
import homeRouter from './src/routes/homeRoute';
import UserRoute from './src/routes/UserRoute';
import AlunoRouter from './src/routes/AlunoRouter';
import photoRoute from './src/routes/photoRouter';

class App {
  constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, 'src', 'upload')))
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/', UserRoute)
    this.app.use('/', AlunoRouter)
    this.app.use('/', photoRoute);
  }
}

export default new App().app;
