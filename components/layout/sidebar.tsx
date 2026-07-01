"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Beaker,
  BookOpen,
  Boxes,
  FlaskConical,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Users,
} from "lucide-react";

const navigationItems = [
  {
    label: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Kho ý tưởng",
    href: "/ideas",
    icon: Lightbulb,
  },
  {
    label: "Dự án",
    href: "/projects",
    icon: Boxes,
  },
  {
    label: "Thử nghiệm",
    href: "/experiments",
    icon: FlaskConical,
  },
  {
    label: "Thư viện Research",
    href: "/library",
    icon: BookOpen,
  },
  {
    label: "Thành viên",
    href: "/members",
    icon: Users,
  },
  {
    label: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-[#0d192d] md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-slate-800 px-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
            <Beaker className="size-5 text-cyan-400" />
          </div>

          <div>
            <p className="font-bold text-slate-100">
              SMLab-R&amp;D
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Robotics &amp; Engineering
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100",
              ].join(" ")}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}