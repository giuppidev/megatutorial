"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Spinner } from "../icons/spinner";

interface FormButtonProps {
  text: string;
}

export const FormButton = ({ text }: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="space-x-2 w-full">
      <span>{text}</span>
      {pending && <Spinner />}
    </Button>
  );
};
