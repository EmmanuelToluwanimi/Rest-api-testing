import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import { deserializeUser } from './middleware/deserializeUser';


const PORT = config.get<number>('port') || 5000;

export const app = express();
app.use(express.json());
app.use(deserializeUser);


app.listen(PORT, async () => {

  logger.info(`Server is running at http://localhost:${PORT}`);

  await connect();
  
  routes(app);
});
