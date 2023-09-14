import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import LogOutButton from "./logOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export async function UserNav() {
  const session = await getServerSession(authOptions);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative h-8 w-8 flex justify-center items-center rounded-full"
          )}
        >
          <Icons.settings className="w-5 h-5 text-[#64748B] dark:text-white " />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0 " align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center h-[50px]  w-full justify-start  gap-x-4 ">
            <Avatar className="h-12 w-12 ">
              <AvatarImage
                src={session?.user.image || "/assets/avatar.png"}
                alt="@abdullah"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium ">{session?.user.name}</p>
              <p className="text-xs  text-muted-foreground">
                {session?.user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal  p-0 ">
          <p className="text-sm font-medium my-2 ml-4">Workspaces</p>
          <div className="w-full bg-blue-200 h-[40px] flex justify-start items-center gap-x-4">
            <Avatar className="h-7 w-7 ml-4">
              <AvatarImage src="/avatars/03.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <h3 className="text-sm text-neutral-600">my agency name</h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="w-full flex items-center justify-start mt-2 "
          >
            <Icons.add className="mr-2 w-4 h-4 text-neutral-600" /> add new
            agency
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/private/account">
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            my team
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
