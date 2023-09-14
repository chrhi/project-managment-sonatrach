"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { authSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type Inputs = z.infer<typeof authSchema>;

export function SignInForm() {
  const router = useRouter();
  //   const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {
    setIsLoading(true);

    signIn("credentials", {
      email: data.email,
      password: data.password,
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      toast({
        title: "oh no something went wrong",
      });
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4 w-[98%]   lg:w-[30%]  rounded-lg mx-auto justify-center  p-8 h-[500px]   "
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Sign in to ProjectFlow
        </h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="px-4  h-12"
                  placeholder="rodneymullen180@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="px-4  h-12"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
          size="lg"
          disabled={isLoading}
          className={cn(" text-white rounded-full h-12  ")}
        >
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>

        <p>
          {" "}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          you don't have an account ?{" "}
          <Link href={"/sign-up"} className="text-blue-500 text-lg ">
            sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
