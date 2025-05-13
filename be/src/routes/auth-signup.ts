import express from "express";
import { checkUser } from "../constrollers/auth/sign-up.controller";

export const checkUserRouter = express.Router();

checkUserRouter.post("/", checkUser as any);
