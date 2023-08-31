import { Header } from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="container px-4">{children}</main>
    </>
  );
}
