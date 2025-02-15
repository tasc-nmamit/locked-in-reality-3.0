import { z } from "zod";

export const RegisterSchemaZ = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  email: z
    .string()
    .email()
    .refine(
      (value) => value.endsWith("@incridea.lir.in"),
      "Email must end with incridea.lir.in",
    ),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const LoginSchemaZ = z.object({
  email: z
    .string()
    .email()
    .refine(
      (value) => value.endsWith("@incridea.lir.in"),
      "Email must end with incridea.lir.in",
    ),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});
