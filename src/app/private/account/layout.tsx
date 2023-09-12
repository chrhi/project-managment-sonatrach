import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Acount",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/private/account",
  },
  {
    title: "Account",
    href: "/private/account/Account",
  },
  {
    title: "Appearance",
    href: "/private/account/Appearance",
  },
  {
    title: "Notifications",
    href: "/private/account/Notifications",
  },
  {
    title: "Display",
    href: "/private/account/Display",
  },
  {
    title: "Organization",
    href: "/private/account/organization",
  },
  {
    title: "My team",
    href: "/private/account/Display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="  space-y-6 p-10 pb-16 block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Organization settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
