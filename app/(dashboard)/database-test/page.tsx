import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
  try {
    const [userCount, categoryCount, ideaCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.ideaCategory.count(),
        prisma.idea.count(),
      ]);

    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-cyan-400">
          Kiểm tra cơ sở dữ liệu
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Kết nối Supabase thành công
        </h1>

        <p className="mt-2 text-slate-400">
          Prisma Client đã đọc được dữ liệu PostgreSQL.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-800 bg-[#111c30] p-6">
            <p className="text-sm text-slate-400">Người dùng</p>
            <p className="mt-3 text-3xl font-bold">
              {userCount}
            </p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-[#111c30] p-6">
            <p className="text-sm text-slate-400">
              Danh mục ý tưởng
            </p>
            <p className="mt-3 text-3xl font-bold">
              {categoryCount}
            </p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-[#111c30] p-6">
            <p className="text-sm text-slate-400">Ý tưởng</p>
            <p className="mt-3 text-3xl font-bold">
              {ideaCount}
            </p>
          </article>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Lỗi kết nối database:", error);

    return (
      <div className="mx-auto max-w-4xl">
        <section className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-2xl font-bold text-red-300">
            Không kết nối được database
          </h1>

          <p className="mt-3 text-slate-300">
            Kiểm tra DATABASE_URL, mật khẩu Supabase và cấu hình Prisma.
          </p>
        </section>
      </div>
    );
  }
}