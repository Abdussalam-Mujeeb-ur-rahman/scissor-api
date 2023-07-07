import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .custom((value, helpers) => {
      if (!value.endsWith("@gmail.com")) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Email Validation")
    .required(),
  password: Joi.string().required(),
});

export const validateLoginRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const { error } = loginSchema.validate(req.body);
        if (error) {
          res
            .status(400)
            .send({ message: "Invalid Request!", error: error.details[0].message });
          return;
        } else {
          next();
        }
    }catch(error) {
        next(error);
    }
};
