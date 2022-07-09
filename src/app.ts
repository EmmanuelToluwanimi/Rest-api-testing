import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import { deserializeUser } from './middleware/deserializeUser';
import createServer from './utils/server';

const PORT = config.get<number>('port') || 5000;

const app = createServer()


app.listen(PORT, async () => {

  logger.info(`Server is running at http://localhost:${PORT}`);

  await connect();
  
});
