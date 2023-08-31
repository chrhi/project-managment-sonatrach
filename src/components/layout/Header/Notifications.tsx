import { UserNav } from "@/components/user-nav";
import React from "react";
import Bing from "./Bell";

function Notifications() {
  return (
    <div className="w-[30%] gap-x-4 h-full flex items-center justify-end">
      <Bing />
      <UserNav />
    </div>
  );
}

export default Notifications;
