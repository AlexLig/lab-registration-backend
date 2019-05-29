import express, { Request, Response, NextFunction } from 'express';

export const registerRouter = express.Router();

registerRouter.route('/student').post(async (req, res, next) => {});


registerRouter.route('/teacher').post(async (req, res, next) => {});
