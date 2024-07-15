"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  error?: string;
};

export const registerAction = async (
  prevState: FormState,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!password || password != confirmPassword) {
    return { message: "", error: "Password is different" };
  }

  const supabaseClient = createClient();
  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { message: "", error: error.message };
  }

  return { message: "Success, check your email." };
};

export const loginAction = async (formData: FormData) => {
  "use server";
  const supabaseClient = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    return;
  }

  redirect("/courses");
};
