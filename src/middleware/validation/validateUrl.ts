
import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';
import axios from 'axios';

const urlSchema = Joi.object({
  url: Joi.string().uri().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
});



export const validateUrlBody = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = urlSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: "Invalid URL!" });
        return;
    }

    try {
      await axios.get(req.body.url);
      next();
    } catch (error) {
      res.status(400).json({ message: 'URL does not exist. Please provide a valid URL.' });
      return;
    }
  } catch (error) {
    next(error);
  }
};