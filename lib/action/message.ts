import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { model } from "../googleAi";
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
  const session = model.startChat();
  const labelResult = params.chatId
    ? undefined
    : await session.sendMessage([
        "write a label for this message with 3 to 7 words, respond directly as a label and match the language",
        params.request,
        params.response,
      ]);
  const label = labelResult?.response.text();
  const message = await prisma.message.create({
    data: {
      request: params.request,
      response: params.response,
      Chat: params.chatId
        ? { connect: { id: params.chatId } }
        : {
            create: {
              label: label ?? new Date().toLocaleString(),
              User: { connect: { id: context.User.id } },
            },
          },
    },
  });
  redirect(`/app?chatId=${message.chatId}`);
}
