"use server";

import { compareSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwt } from "./jose";
import { prisma } from "./prisma";

export async function appContext(token?: string) {
  if (!token) throw new Error(JSON.stringify({ token: [token, typeof token] }));
  const { userId } = await jwt.verify(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { Chat: { include: { Message: {} } } },
  });
  return { User: user };
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
      throw new Error(
        JSON.stringify({
          passwordsAreEqual: [passwordsAreEqual, typeof passwordsAreEqual],
        }),
      );
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

export async function userRequestMessage(formData: FormData) {
  const token = cookies().get(userLogin.name)?.value;
  const context = await appContext(token);
  const message = await prisma.message.create({
    data: {
      Chat: {
        connectOrCreate: {
          where: { id: formData.get("chatId") as string },
          create: {
            label: "label",
            User: { connect: { id: context.User.id } },
          },
        },
      },
      request: "request",
      response: "response",
    },
  });
  redirect(`/app?chatId=${message.chatId}`);
}
