"use server";

import { jwt } from "../jose";
import { prisma } from "../prisma";
import { actionError } from "./utils";

async function context(token?: string) {
  if (!token) throw actionError("token", token);
  const { userId } = await jwt.verify(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { Chat: { include: { Message: {} } } },
  });
  return { User: user };
}

export { context };
