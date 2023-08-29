import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function NoAuthHeader() {
  return (
    <div className="w-full h-[50px] border-b ">
      <div className=" flex items-center w-full h-full justify-between  container">
        <Image src={"/logo.png"} alt="logo" width={35} height={35} />
        <Button variant="ghost">log in</Button>
      </div>
    </div>
  );
}

export default NoAuthHeader;
