import Image from "next/image";
import Navs from "./Navs";
import Notifications from "./Notifications";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full  bg-white border-b sticky top-0  h-[50px] flex items-center justify-between px-4 ">
      <div className="w-[20%] h-full  flex items-center justify-start">
        <Link href={"/private"}>
          <Image src={"/logo.png"} alt="logo" width={33} height={33} />
        </Link>
      </div>
      <Navs />
      <Notifications />
    </div>
  );
};
