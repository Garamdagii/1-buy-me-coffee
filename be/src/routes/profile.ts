import express from "express";
import {
  createProfile,
  deleteProfile,
  findProfile,
  updateProfile,
} from "../controllers/profile";
import { verifyToken } from "../middleware/auth";

export const profileRouter = express.Router();

profileRouter
  .post("/", createProfile as any)
  .get("/", verifyToken as any, findProfile as any)
  .put("/:id", updateProfile as any)
  .delete("/", deleteProfile as any);
