import express from "express";
import {
  createProfile,
  deleteProfile,
  findProfile,
  findProfileByID,
  updateProfile,
} from "../controllers/profile";

export const profileRouter = express.Router();

profileRouter
  .post("/", createProfile as any)
  .get("/", findProfile as any)
  .get("/:id", findProfileByID as any)
  .put("/:id", updateProfile as any)
  .delete("/", deleteProfile as any);
