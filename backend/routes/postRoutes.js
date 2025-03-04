import express from "express";

import {
  getFeedPost,
  getPost,
  createPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getUserPosts,
  updatePost,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPost);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.patch("/update/:id", protectRoute, updatePost);

export default router;
