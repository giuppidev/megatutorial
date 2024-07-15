"use client";

import { FormButton } from "@/components/ui/form-button";
import { useFormState } from "react-dom";
import { FormState, registerAction } from "../action";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

const initialState: FormState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = useFormState(registerAction, initialState);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md md:min-w-96">
      <Link href="/">
        <Logo className="w-full px-8 pt-4 mx-auto" />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200 py-8">
        Welcome!
      </h1>
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center"></div>
          <a
            href="/login"
            className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Login
          </a>
        </div>
        <FormButton text="Register" />
        <div className="text-green-700">{state.message}</div>
        <div className="text-red-700">{state.error}</div>
      </form>
    </div>
  );
}
