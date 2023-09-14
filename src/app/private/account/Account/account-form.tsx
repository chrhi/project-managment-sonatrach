"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast, useToast } from "@/components/ui/use-toast";
import { ChangeEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Icons } from "@/components/icons";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { accountSchema } from "@/lib/validations/user";
import { uploadFiles } from "@/lib/uploadthing";

type AccountSchema = z.infer<typeof accountSchema>;

export function AccountForm() {
  const inputRefrence = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  type Inputs = z.infer<typeof accountSchema>;

  const mutation = useMutation({
    mutationFn: async (paylaod: Inputs & { imageUrl: string }) => {
      const { data } = await axios.post("/api/users/update-accout", paylaod);
      return data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "oh no something went wrong",
      });
    },
    onSuccess: () => {
      toast({
        title: "updated succefully",
      });
    },
  });

  async function onSubmit(data: AccountSchema) {
    setIsLoading(true);
    try {
      const [res] = await uploadFiles({
        endpoint: "imageUploader",
        files: [selectedFile as File],
      });

      await mutation.mutateAsync({ ...data, imageUrl: res?.url });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file from the input element
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file); // Update the state with the selected image file
      const previewUrl = URL.createObjectURL(file); // Create a temporary URL for the selected image
      setImagePreviewUrl(previewUrl); // Update the state with the preview URL
    } else {
      // If the selected file is not an image, you can display an error message or perform other actions

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select a valid image file.",
      });
    }
    setSelectedFile(file); // Update the state with the selected file
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full h-[150px] flex items-center justify-start ">
          <div className="w-[20%] gap-y-2 flex flex-col h-full items-center">
            <Avatar className="w-24 h-24 shadow-lg">
              <AvatarImage
                src={
                  imagePreviewUrl || session?.user.image || "/assets/avatar.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              onClick={() => inputRefrence?.current?.click()}
              className="w-10 h-10 rounded-[50%] "
            >
              <Icons.pencil size={32} color="#ffffff" strokeWidth={3} />
              <input
                ref={inputRefrence}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "outline-none hidden w-[0.1rem] h-[0.1rem] -z-[999] bg-white border-none"
                )}
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={session?.user.firstName}
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="text-white">
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update account
          <span className="sr-only">Update account</span>
        </Button>
      </form>
    </Form>
  );
}
