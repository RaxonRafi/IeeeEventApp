import z from "zod";

export const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.date(),
  blogId: z.number(),
  userId: z.number(),
});
export const LikeSchema = z.object({
  id: z.number(),
  blogId: z.number(),
  userId: z.number(),
});
export const DislikeSchema = z.object({
  id: z.number(),
  blogId: z.number(),
  userId: z.number(),
});

// export const BlogWithCommentsSchema = BlogSchema.extend({
//   comments: z.array(CommentSchema),
//   likes: z.array(LikeSchema),
//   dislikes: z.array(DislikeSchema),
// });
