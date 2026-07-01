import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { requireUser } from "@/lib/auth/user";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await requireUser();

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <Sidebar />

      <div className="min-w-0 lg:pl-[250px]">
        <Header user={currentUser} />

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}