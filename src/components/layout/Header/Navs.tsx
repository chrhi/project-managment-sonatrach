"use client";

const navs = [
  {
    name: "Dashboard",
    path: "/private",
    icons: <Icons.dashBoard className="text-[#64748B] w-5 h-5 mr-2" />,
  },
  {
    name: "Chat",
    path: "/private",
    icons: <Icons.chat className="text-[#64748B] w-4 h-4 mr-2" />,
  },
  {
    name: "Projects",
    path: "/private",
    icons: <Icons.projects className="text-[#64748B] w-4 h-4 mr-2" />,
  },
  {
    name: "Tasks",
    path: "/private",
    icons: <Icons.tasks className="text-[#64748B] w-4 h-4 mr-2" />,
  },
  {
    name: "Wbs",
    path: "/private",
    icons: <Icons.wbs className="text-[#64748B] w-4 h-4 mr-2" />,
  },
  {
    name: "Docs",
    path: "/private",
    icons: <Icons.docs className="text-[#64748B] w-4 h-4 mr-2" />,
  },
  {
    name: "Boards",
    path: "/private",
    icons: <Icons.boards className="text-[#64748B] w-4 h-4 mr-2" />,
  },
];

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

function Navs() {
  return (
    <div className="w-[50%] h-full flex justify-center gap-x-4 items-center">
      {navs.map((item) => {
        return (
          <Button
            key={item.path + "key"}
            variant="ghost"
            className={cn("text-sm font-medium text-[#64748B]")}
          >
            {item.icons}
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}

export default Navs;
