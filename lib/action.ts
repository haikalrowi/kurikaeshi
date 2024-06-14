"use server";

import { compareSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwt } from "./jose";
import { prisma } from "./prisma";

const utils = {
  serverError(name: string, value: unknown) {
    return new Error(JSON.stringify([name, typeof value, value], undefined, 2));
  },
};

export async function appContext(token?: string) {
  if (!token) throw utils.serverError("token", token);
  const { userId } = await jwt.verify(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { Chat: { include: { Message: {} } } },
  });
  return { User: user };
}

export async function userLogin(formData: FormData) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: formData.get("email") as string },
    include: { Password: {} },
  });
  if (!user.Password) throw utils.serverError("user.Password", user.Password);
  const passwordsAreEqual = compareSync(
    formData.get("password") as string,
    user.Password.password,
  );
  if (!passwordsAreEqual)
    throw utils.serverError("passwordsAreEqual", passwordsAreEqual);
  const token = await jwt.sign({ userId: user.id });
  cookies().set(userLogin.name, token);
  revalidatePath("/app");
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
