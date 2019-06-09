import express, { Request, Response, NextFunction } from 'express';

export const loginRouter = express.Router();

loginRouter.route('/').post(async (req, res, next) => {});
