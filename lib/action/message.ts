import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { context as appContext } from "./app";
import { login } from "./user";

export async function create(params: {
  chatId?: string;
  request: string;
  response: string;
}) {
  const token = cookies().get(login.name)?.value;
  const context = await appContext(token);
  const message = await prisma.message.create({
    data: {
      request: params.request,
      response: params.response,
      Chat: params.chatId
        ? { connect: { id: params.chatId } }
        : {
            create: {
              label: "label",
              User: { connect: { id: context.User.id } },
            },
          },
    },
  });
  redirect(`/app?chatId=${message.chatId}`);
}
