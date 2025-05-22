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
  .get("/all", findProfile as any)
  .get("/", findProfileByID as any)
  .put("/:id", updateProfile as any)
  .delete("/", deleteProfile as any);
