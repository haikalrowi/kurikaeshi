import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  return <Button type="submit" isLoading={pending} {...props} />;
}
