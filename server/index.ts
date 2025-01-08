import express from 'express';

import routes from './repo/routes';
import { db } from './repo/db';
import {prodMiddlewares} from './repo/prodMiddleware';

const app = express();

prodMiddlewares(app);
routes(app);
db();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
