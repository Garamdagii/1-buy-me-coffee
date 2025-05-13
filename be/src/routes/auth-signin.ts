import express from "express";
import { SignIn } from "../constrollers/auth/sign-in.controller";

export const signinRouter = express.Router();

signinRouter.post("/", SignIn as any);
