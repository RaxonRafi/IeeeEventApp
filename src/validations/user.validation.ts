import { z } from "zod";
export const RoleEnum = z.enum(["admin", "moderator", "member"]);
export type Role = z.infer<typeof RoleEnum>;

export const UserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z
        .string()
        .email({ message: "Invalid email address format." }),
  student_id: z.string(),
  department: z.string(),
  password: z.string(),
  role: RoleEnum.default("member").optional(),
});
