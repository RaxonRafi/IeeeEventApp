import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createBlog = async (payload: { title: string; content: string }) => {
  return await prisma.blog.create({
    data: payload,
  });
};

const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: {
      comments: true,
      likes: true,
      dislikes: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleBlog = async (id: number) => {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
      dislikes: true,
    },
  });
};

const updateBlog = async (id: number, payload: any) => {
  return await prisma.blog.update({
    where: { id },
    data: payload,
  });
};

const deleteBlog = async (id: number) => {
  return await prisma.blog.delete({
    where: { id },
  });
};
const addComment = async (userId: number, blogId: number, content: string) => {
    return await prisma.comment.create({
      data: {
        userId,
        blogId,
        content,
      },
      include: {
        user: true,
      },
    });
  };

  const likeBlog = async (userId: number, blogId: number) => {
    const alreadyLiked = await prisma.like.findFirst({
      where: { userId, blogId },
    });
  
    if (alreadyLiked) {
      throw new Error("You already liked this blog");
    }
  
    await prisma.dislike.deleteMany({ where: { userId, blogId } });
  
    return await prisma.like.create({
      data: { userId, blogId },
    });
  };
  const dislikeBlog = async (userId: number, blogId: number) => {
    const alreadyDisliked = await prisma.dislike.findFirst({
      where: { userId, blogId },
    });
  
    if (alreadyDisliked) {
      throw new Error("You already disliked this blog");
    }
  
   
    await prisma.like.deleteMany({ where: { userId, blogId } });
  
    return await prisma.dislike.create({
      data: { userId, blogId },
    });
  };
export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
  dislikeBlog
};
