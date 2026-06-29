"use client";

import {
  Bell,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

export function Header() {
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

        <button
          type="button"
          aria-label="Tài khoản"
          className="flex size-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300"
        >
          <UserRound className="size-5" />
        </button>
      </div>
    </header>
  );
}