
import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';

const requestBodySchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().custom((value, helpers) => {
    if (!value.endsWith('@gmail.com')) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Email Validation').required(),
  password: Joi.string().min(5).required(),
});



export const validateRequestBodyToGenerateLink = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = requestBodySchema.validate(req.body);

        if(error) {
            res.status(400).json({ message: "Invalid Request!", error: error.details[0].message });
            return;
        }

        next();

    } catch (error) {
        next(error);
    }
};