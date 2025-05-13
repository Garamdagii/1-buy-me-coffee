
import express from "express";
import { createUser, deleteUserById, findUsers, updateUserById } from "../constrollers/user";

export const userRouter = express.Router();
userRouter
  .post("/", createUser as any)
  .get("/", findUsers as any)
  .put("/:id", updateUserById as any)
  .delete("/", deleteUserById as any);
