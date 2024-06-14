import { Content } from "@google/generative-ai";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { model } from "../googleAi";
import { prisma } from "../prisma";
import { context as appContext } from "./app";
import { login } from "./user";

export async function generateResult(formData: FormData) {
  const token = cookies().get(login.name)?.value;
  const context = await appContext(token);
  const chatId = formData.get("chatId") as string;
  const request = formData.get("request") as string;
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { Message: {} },
  });
  const history = chat?.Message.flatMap((message) => [
    { role: "user", parts: [{ text: message.request }] } satisfies Content,
    { role: "model", parts: [{ text: message.response }] } satisfies Content,
  ]);
  const session = model.startChat({ history });
  const result = await session.sendMessage(request);
  const response = result.response.text();
  const message = await prisma.message.create({
    data: {
      request,
      response,
      Chat: chat
        ? { connect: { id: chat.id } }
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
