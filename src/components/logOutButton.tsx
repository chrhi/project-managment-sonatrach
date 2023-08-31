"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";

function LogOutButton() {
  return (
    <DropdownMenuItem
      onClick={async () => await signOut()}
      className="cursor-pointer"
    >
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default LogOutButton;
