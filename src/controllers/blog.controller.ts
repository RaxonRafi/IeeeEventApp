
import { Request, Response, NextFunction } from "express";
import { BlogService } from "../services/blog.service";
import { sendResponse } from "../utils/sendResponse";

export const BlogController = {
  createBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blog = await BlogService.createBlog(req.body);
      sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Blog created successfully",
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllBlogs: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const blogs = await BlogService.getAllBlogs();
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All blogs fetched",
        data: blogs,
      });
    } catch (err) {
      next(err);
    }
  },

  getSingleBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const blog = await BlogService.getSingleBlog(id);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog fetched",
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const blog = await BlogService.updateBlog(id, req.body);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog updated",
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const blog = await BlogService.deleteBlog(id);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog deleted",
        data: blog,
      });
    } catch (err) {
      next(err);
    }
  },
  comment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { blogId, content } = req.body;

      const result = await BlogService.addComment(userId, blogId, content);
      sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Comment added",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  like: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { blogId } = req.body;

      const result = await BlogService.likeBlog(userId, blogId);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog liked",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  dislike: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { blogId } = req.body;

      const result = await BlogService.dislikeBlog(userId, blogId);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog disliked",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};
