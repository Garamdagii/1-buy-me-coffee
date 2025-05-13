import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../../utils/env";

export const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user)
      return res
        .status(404)
        .send({
          message: "User not found.",
        })
        .end();

    const isMatch = compareSync(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .send({
          message: "Email or password is incorrect",
        })
        .end();

    const token = jwt.sign(user, secret_key as any, { expiresIn: 3600 });
    // console.log(token, "token")
    return res
      .cookie("token", token, { maxAge: 60 * 1000 * 20, secure: false })
      .end();
  } catch (error) {
    return res
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};
