import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Lightbulb,
  Pencil,
  Save,
  Target,
  UserRound,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { updateIdeaStatus } from "../actions";

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

type IdeaDetailPageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    updated?: string;
    statusUpdated?: string;
  }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatCurrency(value: unknown) {
  if (value === null || value === undefined) {
    return "Chưa xác định";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "Chưa xác định";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function EmptyValue() {
  return (
    <p className="text-sm italic text-slate-600">
      Chưa có thông tin
    </p>
  );
}

export default async function IdeaDetailPage({
  params,
  searchParams,
}: IdeaDetailPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const idea = await prisma.idea.findUnique({
    where: {
      id,
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

  if (!idea) {
    notFound();
  }
  const updateIdeaStatusWithId =
    updateIdeaStatus.bind(null, idea.id);

  return (
    <div className="mx-auto max-w-6xl">
  {query.updated === "1" && (
    <div className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
      Ý tưởng đã được cập nhật thành công.
    </div>
  )}

  {query.statusUpdated === "1" && (
    <div className="mb-6 rounded-xl border border-blue-400/30 bg-blue-400/10 px-5 py-4 text-sm text-blue-200">
      Trạng thái ý tưởng đã được cập nhật thành công.
    </div>
  )}

      <Link
        href="/ideas"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
      >
        <ArrowLeft className="size-4" />
        Quay lại kho ý tưởng
      </Link>

      <header className="mt-6 flex flex-col gap-5 border-b border-slate-800 pb-7 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-cyan-400">
              {idea.code}
            </span>

            <span
              className={[
                "rounded-full border px-3 py-1 text-xs font-semibold",
                statusClasses[idea.status],
              ].join(" ")}
            >
              {statusLabels[idea.status]}
            </span>

            <span
              className={[
                "text-xs font-semibold",
                priorityClasses[idea.priority],
              ].join(" ")}
            >
              Ưu tiên: {priorityLabels[idea.priority]}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-100">
            {idea.title}
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
            {idea.summary}
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <Link
            href={`/ideas/${idea.id}/edit`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <Pencil className="size-4" />
            Chỉnh sửa
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-800 bg-[#111c30] p-5">
          <UserRound className="size-5 text-cyan-400" />

          <p className="mt-4 text-xs text-slate-500">
            Người tạo
          </p>

          <p className="mt-1 font-semibold text-slate-100">
            {idea.creator.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {idea.creator.email}
          </p>
        </article>

        <article className="rounded-xl border border-slate-800 bg-[#111c30] p-5">
          <CalendarDays className="size-5 text-cyan-400" />

          <p className="mt-4 text-xs text-slate-500">
            Ngày tạo
          </p>

          <p className="mt-1 font-semibold text-slate-100">
            {formatDate(idea.createdAt)}
          </p>
        </article>

        <article className="rounded-xl border border-slate-800 bg-[#111c30] p-5">
          <Clock3 className="size-5 text-cyan-400" />

          <p className="mt-4 text-xs text-slate-500">
            Thời gian dự kiến
          </p>

          <p className="mt-1 font-semibold text-slate-100">
            {idea.estimatedDuration !== null
              ? `${idea.estimatedDuration} tháng`
              : "Chưa xác định"}
          </p>
        </article>

        <article className="rounded-xl border border-slate-800 bg-[#111c30] p-5">
          <CircleDollarSign className="size-5 text-cyan-400" />

          <p className="mt-4 text-xs text-slate-500">
            Kinh phí dự kiến
          </p>

          <p className="mt-1 font-semibold text-slate-100">
            {formatCurrency(idea.estimatedBudget)}
          </p>
        </article>
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
              <Lightbulb className="size-5 text-cyan-400" />
              Vấn đề cần giải quyết
            </h2>

            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {idea.problem ? idea.problem : <EmptyValue />}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
              <Target className="size-5 text-cyan-400" />
              Giải pháp đề xuất
            </h2>

            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {idea.proposedSolution ? (
                idea.proposedSolution
              ) : (
                <EmptyValue />
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
            <h2 className="text-lg font-semibold text-slate-100">
              Tính mới và điểm khác biệt
            </h2>

            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {idea.novelty ? idea.novelty : <EmptyValue />}
            </div>
          </article>
        </div>

        <aside className="space-y-6">
            <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
                <h2 className="font-semibold text-slate-100">
                Quản lý trạng thái
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                Cập nhật giai đoạn xử lý hiện tại của ý tưởng.
                </p>

                <form
                action={updateIdeaStatusWithId}
                className="mt-5 space-y-4"
                >
                <div>
                    <label
                    htmlFor="status"
                    className="mb-2 block text-xs font-medium text-slate-400"
                    >
                    Trạng thái hiện tại
                    </label>

                    <select
                    id="status"
                    name="status"
                    defaultValue={idea.status}
                    className="h-11 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                    >
                    <option value="DRAFT">
                        Bản nháp
                    </option>

                    <option value="PENDING">
                        Chờ đánh giá
                    </option>

                    <option value="REVIEWING">
                        Đang đánh giá
                    </option>

                    <option value="NEEDS_REVISION">
                        Cần chỉnh sửa
                    </option>

                    <option value="FEASIBLE">
                        Khả thi
                    </option>

                    <option value="NOT_FEASIBLE">
                        Không khả thi
                    </option>

                    <option value="APPROVED">
                        Đã phê duyệt
                    </option>

                    <option value="CONVERTED_TO_PROJECT">
                        Đã chuyển thành dự án
                    </option>

                    <option value="PAUSED">
                        Tạm dừng
                    </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                    <Save className="size-4" />
                    Cập nhật trạng thái
                </button>
                </form>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
                <h2 className="font-semibold text-slate-100">
                Thông tin phân loại
                </h2>

                <dl className="mt-5 space-y-5">
                <div>
                    <dt className="text-xs text-slate-500">
                    Danh mục
                    </dt>

                    <dd className="mt-2">
                    {idea.category ? (
                        <span
                        className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
                        style={{
                            color:
                            idea.category.color ?? "#94a3b8",
                            borderColor: `${
                            idea.category.color ?? "#64748b"
                            }55`,
                            backgroundColor: `${
                            idea.category.color ?? "#64748b"
                            }15`,
                        }}
                        >
                        {idea.category.name}
                        </span>
                    ) : (
                        <EmptyValue />
                    )}
                    </dd>
                </div>

                <div>
                    <dt className="text-xs text-slate-500">
                    Đối tượng sử dụng
                    </dt>

                    <dd className="mt-2 text-sm leading-6 text-slate-300">
                    {idea.targetUsers || "Chưa xác định"}
                    </dd>
                </div>

                <div>
                    <dt className="text-xs text-slate-500">
                    Kết quả dự kiến
                    </dt>

                    <dd className="mt-2 text-sm leading-6 text-slate-300">
                    {idea.expectedResult || "Chưa xác định"}
                    </dd>
                </div>
                </dl>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-[#111c30] p-6">
                <h2 className="font-semibold text-slate-100">
                Thông tin cập nhật
                </h2>

                <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">
                    Ngày tạo
                    </dt>

                    <dd className="text-right text-slate-300">
                    {formatDate(idea.createdAt)}
                    </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">
                    Cập nhật cuối
                    </dt>

                    <dd className="text-right text-slate-300">
                    {formatDate(idea.updatedAt)}
                    </dd>
                </div>
                </dl>
            </article>
            </aside>
      </section>
    </div>
  );
}