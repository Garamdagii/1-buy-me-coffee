import express from "express";
import {
  createProfile,
  deleteProfile,
  findProfile,
  findProfileById,
  updateProfile,
} from "../controllers/profile";
import { verifyToken } from "../middleware/auth";

export const profileRouter = express.Router();
profileRouter
  .post("/", createProfile as any)
  .get("/all", verifyToken as any, findProfile as any)
  .get("/", findProfileById as any)
  .put("/:id", updateProfile as any)
  .delete("/", deleteProfile as any);
