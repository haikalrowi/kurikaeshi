"use server";

import { compareSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwt } from "./jose";
import { prisma } from "./prisma";

export async function appContext() {
  const token = cookies().get(userLogin.name)?.value;
  if (!token) throw new Error(JSON.stringify({ token: token ?? null }));
  const { userId } = await jwt.verify(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { Chat: { include: { Message: {} } } },
  });
  return { user };
}

export async function userLogin(formData: FormData) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: formData.get("email") as string },
      include: { Password: {} },
    });
    const passwordsAreEqual = compareSync(
      formData.get("password") as string,
      user.Password?.password!,
    );
    if (!passwordsAreEqual)
      throw new Error(JSON.stringify({ passwordsAreEqual }));
    const token = await jwt.sign({ userId: user.id });
    cookies().set(userLogin.name, token);
    revalidatePath("/app");
  } catch (error) {
    console.log(error);
    redirect("/app");
  }
}

export async function userLogout() {
  cookies().delete(userLogin.name);
  redirect("/app");
}
