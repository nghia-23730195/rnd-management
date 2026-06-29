import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07101f] text-slate-100">
      <Sidebar />

      <div className="min-h-screen min-w-0 md:pl-64">
        <Header />

        <main className="min-w-0 p-4 md:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}