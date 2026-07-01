"use client";

import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
} from "lucide-react";

import { logoutAction } from "@/app/(dashboard)/logout-action";

type HeaderProps = {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: string;
    active: boolean;
  };
};

export function Header({ user }: HeaderProps) {
  const firstLetter =
    user.name.trim().charAt(0).toUpperCase() || "U";

  const roleLabel =
    user.role === "ADMIN"
      ? "Quản trị viên"
      : user.role === "RND_MANAGER"
        ? "Quản lý R&D"
        : user.role === "PROJECT_MANAGER"
          ? "Quản lý dự án"
          : user.role === "REVIEWER"
            ? "Người đánh giá"
            : user.role === "VIEWER"
              ? "Người xem"
              : "Thành viên";

  return (
    <header className="sticky top-0 z-30 flex h-20 min-w-0 items-center justify-between border-b border-slate-800 bg-[#081221]/95 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Mở menu"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-300 md:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-slate-100 sm:text-lg">
            SMLab-R&amp;D Dashboard
          </h2>

          <p className="hidden truncate text-xs text-slate-500 sm:block">
            Quản lý ý tưởng, dự án và tài liệu nghiên cứu
          </p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-2">
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

          <input
            type="search"
            placeholder="Tìm kiếm..."
            className="h-10 w-64 rounded-lg border border-slate-700 bg-[#111c30] pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <button
          type="button"
          aria-label="Thông báo"
          className="relative flex size-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan-400" />
        </button>

        <button
          type="button"
          aria-label="Cài đặt"
          className="hidden size-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 sm:flex"
        >
          <Settings className="size-5" />
        </button>

        <div className="hidden min-w-0 text-right lg:block">
          <p className="max-w-40 truncate text-sm font-semibold text-slate-200">
            {user.name}
          </p>

          <p className="max-w-40 truncate text-xs text-slate-500">
            {roleLabel}
          </p>
        </div>

        <div
          title={`${user.name} - ${user.email}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 font-bold text-cyan-300"
        >
          {firstLetter}
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Đăng xuất"
            title="Đăng xuất"
            className="flex size-10 items-center justify-center rounded-lg border border-slate-800 bg-[#111c30] text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
          >
            <LogOut className="size-5" />
            <span className="sr-only">Đăng xuất</span>
          </button>
        </form>
      </div>
    </header>
  );
}