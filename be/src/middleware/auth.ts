import { configDotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

configDotenv();

const secret_key = process.env.SECRET_KEY;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    const decode = jwt.verify(token, secret_key as string);
    console.log(decode, "decode");
    next();
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};
