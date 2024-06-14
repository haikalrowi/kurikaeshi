import { compareSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwt } from "../jose";
import { prisma } from "../prisma";
import { actionError } from "./utils";

async function login(formData: FormData) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: formData.get("email") as string },
    include: { Password: {} },
  });
  if (!user.Password) throw actionError("user.Password", user.Password);
  const equal = compareSync(
    formData.get("password") as string,
    user.Password.password,
  );
  if (!equal) throw actionError("equal", equal);
  const token = await jwt.sign({ userId: user.id });
  cookies().set(login.name, token);
  revalidatePath("/app");
}

async function logout() {
  cookies().delete(login.name);
  redirect("/app");
}

export { login, logout };
