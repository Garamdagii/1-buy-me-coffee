import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const checkUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUser) {
      return res.status(400).send({ message: "Username already taken." });
    }
    return res.status(200).send({ message: "Username available" });
  } catch (error) {
    console.error(error, "err");
    return res.send({
      success: false,
      message: error,
    });
  }
};
