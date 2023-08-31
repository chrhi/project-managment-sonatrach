/* eslint-disable react/no-unescaped-entities */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { registerSchema } from "@/lib/validations/auth";
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
import Link from "next/link";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

type Inputs = z.infer<typeof registerSchema>;

export function SignUnForm() {
  const router = useRouter();
  const { toast } = useToast();
  //   const { isLoaded, signIn, setActive } = useSignIn();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (paylaod: Inputs) => {
      const { data } = await axios.post("/api/users/create-user", paylaod);
      return data;
    },
    onError: () => {
      toast({
        title: "oh no something went wrong",
      });
    },
    onSuccess: () => {
      toast({
        title: "new user has been created",
      });
      router.push("/sign-in");
    },
  });

  async function onSubmit(data: Inputs) {
    await mutation.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex max-w-4xl flex-col my-5 gap-y-4 w-[98%]   lg:w-[50%] rounded-lg mx-auto justify-center  p-8 h-[700px]   "
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="text-md  text-gray-900">
          Be sure to enter your legal name as it appears on your
          government-issued ID.
        </p>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal first name*</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal last name*</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
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
                  className="p-4 "
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
          disabled={mutation.isLoading}
          className={cn(" text-white rounded-full h-12  ")}
        >
          {mutation.isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign up for an account</span>
        </Button>
        <p>
          {" "}
          Do you have an account ?{" "}
          <Link href={"/sign-in"} className="text-blue-500 text-lg ">
            sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
