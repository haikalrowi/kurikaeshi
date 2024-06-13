"use client";

import { userLogin } from "@/lib/action";
import { Card, CardBody, Input } from "@nextui-org/react";
import { SubmitButton } from "./ui/SubmitButton";

export function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardBody>
          <form action={userLogin}>
            <div className="flex flex-col gap-1">
              <Input type="email" name="email" />
              <Input type="password" name="password" />
              <SubmitButton>Login</SubmitButton>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
