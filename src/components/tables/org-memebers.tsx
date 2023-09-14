"use client";

import Image from "next/image";

import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface orgMemebers {
  name: string;
  email: string;
  role: string;
  image: string;
  lastName: string;
}

export const columns: ColumnDef<orgMemebers>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image}
          alt={`${row.original.name} image`}
          width={60}
          height={60}
          className="rounded-lg "
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "first name",
  },
  {
    accessorKey: "lastname",
    header: "last name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              copy email
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">edit</DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              show in Banner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
