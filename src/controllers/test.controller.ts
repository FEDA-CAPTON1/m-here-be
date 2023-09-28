import { NextFunction, Request, Response } from 'express';
import {
    TestService,
} from '../services/test.service';

const testService = new TestService();

import AppError from '../utils/app.error';
import {
  CreateTestInput
} from "../schemas/test.schema";

export const createTestHandler = async (
  req: Request<{}, {}, CreateTestInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const test = await testService.createTest({
      name: req.body.name,
      address: req.body.address,
      role: req.body.role,
    });
    return res.status(201).json({
      status: "Success",
      data: test
    })
  } catch (err: any) { 
        return res.status(409).json({
          status: 'fail',
          message: err
        });    
    next(err);
  }
};


