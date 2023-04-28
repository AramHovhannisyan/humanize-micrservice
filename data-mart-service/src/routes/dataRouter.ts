import express from 'express';
import { getData } from '../controllers/dataController';

const dataRouter = express.Router();
dataRouter.route('/').get(getData);

export { dataRouter };