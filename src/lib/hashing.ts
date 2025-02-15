import bcrypt from "bcryptjs";
import { env } from "~/env";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password + (env.AUTH_SECRET ?? "secret"), 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  try {
    return await bcrypt.compare(
      password + (env.AUTH_SECRET ?? "secret"),
      hashedPassword,
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}
