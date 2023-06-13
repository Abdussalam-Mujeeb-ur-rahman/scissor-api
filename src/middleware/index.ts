import express, { NextFunction, Request, Response } from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../model/userModel";

import { userModel } from "../model/userModel";

interface CustomRequest extends Request {
  identity?: typeof userModel;
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken) {
      res.status(404).send({ message: "Unauthorized!" });
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    merge(req, { identity: existingUser });

    next();
    
  } catch (error) {
    next(error);
  }
};

export const isOwner = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, "identity._id")! as string;

    if (!currentUserId) {
      res
        .status(404)
        .json({ message: "You are not in possession of this account!" });
      return;
    }

    if (currentUserId.toString() !== id) {
      res
        .status(404)
        .json({ message: "You are not in possession of this account!" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
