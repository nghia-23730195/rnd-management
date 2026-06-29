"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FlaskConical,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    // Đây mới là đăng nhập thử nghiệm.
    // Sau này sẽ thay bằng Auth.js hoặc Supabase Auth.
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 400);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07101f] px-4 text-slate-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <FlaskConical className="size-8 text-cyan-400" />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            SMLab-R&amp;D
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Hệ thống quản lý ý tưởng và dự án nghiên cứu
          </p>
        </div>

        <section className="rounded-2xl border border-slate-700 bg-[#111c30] p-7 shadow-2xl">
          <h2 className="text-2xl font-semibold">
            Đăng nhập
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Nhập thông tin tài khoản để truy cập hệ thống.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-200"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@smlab.vn"
                  className="h-11 w-full rounded-lg border border-slate-700 bg-[#091426] pl-11 pr-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Nhập mật khẩu"
                  className="h-11 w-full rounded-lg border border-slate-700 bg-[#091426] pl-11 pr-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {message && (
              <p className="text-sm text-red-400">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-lg bg-cyan-400 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            SMLab Robotics &amp; Engineering
          </p>
        </section>
      </div>
    </main>
  );
}