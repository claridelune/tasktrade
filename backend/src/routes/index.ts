import express, { Router } from 'express';
import userRouter from './user';
import authRouter from './auth';
import taskRouter  from './tasks';
import auctionRouter from './auction';
import purchaseRouter from './purchase';
import { authToken } from '../middleware/auth';

const router = Router();
const routes = (app: express.Application) => {
  router.use('/auth', authRouter);
  router.use('/user', authToken, userRouter);
  router.use('/task', authToken, taskRouter);
  router.use('/auction', authToken, auctionRouter);
  router.use('/purchase', authToken, purchaseRouter);

  return app.use('/api', router);
};

export default routes;
