// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createTestHandler,
} from '../controllers/test.controller';

import {
  createTestSchema
} from '../schemas/test.schema';

import { validate } from '../middleware/validate';

const testRouter = express.Router();

testRouter.post( '/', validate(createTestSchema), createTestHandler);

export default testRouter;