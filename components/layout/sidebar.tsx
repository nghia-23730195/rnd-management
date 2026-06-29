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

const menuItems = [
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
    icon: Beaker,
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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800 bg-[#0d182b] md:flex">
      <div className="flex h-20 items-center border-b border-slate-800 px-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
          <FlaskConical className="size-6 text-cyan-400" />
        </div>

        <div className="ml-3 min-w-0">
          <h1 className="truncate font-bold tracking-wide text-cyan-100">
            SMLab-R&amp;D
          </h1>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Robotics &amp;
            <br />
            Engineering
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/30"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100",
              ].join(" ")}
            >
              <Icon className="size-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <Link
          href="/experiments"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Beaker className="size-5 shrink-0" />
          <span>Thử nghiệm mới</span>
        </Link>

        <p className="mt-4 truncate text-center text-xs text-slate-600">
          SMLab R&amp;D Management
        </p>
      </div>
    </aside>
  );
}