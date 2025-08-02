
import express from "express";
import { BlogController } from "../controllers/blog.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../interfaces/user.interface";

const router = express.Router();

// All blogs
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);

// Protected routes
router.post("/", checkAuth(Role.admin,Role.moderator), BlogController.createBlog);
router.patch("/:id", checkAuth(Role.admin,Role.moderator), BlogController.updateBlog);
router.delete("/:id", checkAuth(Role.admin), BlogController.deleteBlog);

router.post("/comment", checkAuth(Role.admin,Role.moderator, Role.member), BlogController.comment);
router.post("/like", checkAuth(Role.admin,Role.moderator,Role.member), BlogController.like);
router.post("/dislike", checkAuth(Role.admin,Role.moderator,Role.member), BlogController.dislike);

export const BlogRoutes = router
