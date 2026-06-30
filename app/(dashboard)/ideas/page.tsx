import Link from "next/link";
import {
  CalendarDays,
  Lightbulb,
  Plus,
  Search,
  UserRound,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statusLabels = {
  DRAFT: "Bản nháp",
  PENDING: "Chờ đánh giá",
  REVIEWING: "Đang đánh giá",
  NEEDS_REVISION: "Cần chỉnh sửa",
  FEASIBLE: "Khả thi",
  NOT_FEASIBLE: "Không khả thi",
  APPROVED: "Đã phê duyệt",
  CONVERTED_TO_PROJECT: "Đã thành dự án",
  PAUSED: "Tạm dừng",
} as const;

const statusClasses = {
  DRAFT:
    "border-slate-500/30 bg-slate-500/10 text-slate-300",
  PENDING:
    "border-amber-400/30 bg-amber-400/10 text-amber-300",
  REVIEWING:
    "border-blue-400/30 bg-blue-400/10 text-blue-300",
  NEEDS_REVISION:
    "border-orange-400/30 bg-orange-400/10 text-orange-300",
  FEASIBLE:
    "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  NOT_FEASIBLE:
    "border-red-400/30 bg-red-400/10 text-red-300",
  APPROVED:
    "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  CONVERTED_TO_PROJECT:
    "border-purple-400/30 bg-purple-400/10 text-purple-300",
  PAUSED:
    "border-slate-400/30 bg-slate-400/10 text-slate-300",
} as const;

const priorityLabels = {
  LOW: "Thấp",
  MEDIUM: "Trung bình",
  HIGH: "Cao",
  URGENT: "Khẩn cấp",
} as const;

const priorityClasses = {
  LOW: "text-slate-400",
  MEDIUM: "text-blue-300",
  HIGH: "text-amber-300",
  URGENT: "text-red-300",
} as const;

type IdeasPageProps = {
  searchParams: Promise<{
    created?: string;
  }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function IdeasPage({
  searchParams,
}: IdeasPageProps) {
  const params = await searchParams;

  const ideas = await prisma.idea.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            SMLab-R&amp;D
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-100">
            Kho ý tưởng
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Theo dõi, đánh giá và phát triển các ý
            tưởng nghiên cứu.
          </p>
        </div>

        <Link
          href="/ideas/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus className="size-4" />
          Tạo ý tưởng mới
        </Link>
      </header>

      {params.created === "1" && (
        <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
          Ý tưởng mới đã được lưu thành công.
        </div>
      )}

      <section className="mt-7 rounded-2xl border border-slate-800 bg-[#111c30]">
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-100">
              Danh sách ý tưởng
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tổng cộng {ideas.length} ý tưởng
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              placeholder="Tìm kiếm ý tưởng..."
              className="h-10 w-full rounded-xl border border-slate-700 bg-[#0a1527] pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        {ideas.length === 0 ? (
          <div className="flex min-h-96 flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-cyan-400/10">
              <Lightbulb className="size-8 text-cyan-400" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-100">
              Chưa có ý tưởng nào
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Hãy tạo ý tưởng đầu tiên để bắt đầu quy
              trình nghiên cứu và đánh giá.
            </p>

            <Link
              href="/ideas/new"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              <Plus className="size-4" />
              Tạo ý tưởng đầu tiên
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {ideas.map((idea) => (
              <article
                key={idea.id}
                className="p-5 transition hover:bg-slate-800/20 md:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-cyan-400">
                        {idea.code}
                      </span>

                      <span
                        className={[
                          "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                          statusClasses[idea.status],
                        ].join(" ")}
                      >
                        {statusLabels[idea.status]}
                      </span>

                      <span
                        className={[
                          "text-xs font-medium",
                          priorityClasses[idea.priority],
                        ].join(" ")}
                      >
                        Ưu tiên:{" "}
                        {priorityLabels[idea.priority]}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-slate-100">
                      {idea.title}
                    </h3>

                    <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
                      {idea.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound className="size-3.5" />
                        {idea.creator.name}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        {formatDate(idea.createdAt)}
                      </span>

                      {idea.category && (
                        <span
                          className="rounded-full border px-2.5 py-1"
                          style={{
                            color:
                              idea.category.color ??
                              "#94a3b8",
                            borderColor: `${
                              idea.category.color ??
                              "#64748b"
                            }55`,
                            backgroundColor: `${
                              idea.category.color ??
                              "#64748b"
                            }15`,
                          }}
                        >
                          {idea.category.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/ideas/${idea.id}`}
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}