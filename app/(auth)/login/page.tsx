import { redirect } from "next/navigation";
import {
  FlaskConical,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth/user";
import { loginAction } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/dashboard");
  }

  const query = await searchParams;
  const errorMessage = query.error?.trim();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <FlaskConical className="size-8 text-cyan-400" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-100">
            SMLab-R&amp;D
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Hệ thống quản lý ý tưởng và dự án nghiên cứu
          </p>
        </div>

        <section className="rounded-2xl border border-slate-700 bg-[#111c30] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <h2 className="text-xl font-bold text-slate-100">
            Đăng nhập
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Nhập thông tin tài khoản để truy cập hệ thống.
          </p>

          {errorMessage && (
            <div className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <form
            action={loginAction}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@smlab.vn"
                  className="h-11 w-full rounded-xl border border-slate-700 bg-[#0a1527] pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  maxLength={128}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  className="h-11 w-full rounded-xl border border-slate-700 bg-[#0a1527] pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-cyan-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Đăng nhập
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