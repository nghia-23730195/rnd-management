import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  UsersRound,
  X,
} from "lucide-react";

import type { Prisma } from "@/lib/generated/prisma/client";
import {
  IdeaPriority,
  IdeaStatus,
} from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type IdeasPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    category?: string;
    priority?: string;
    sort?: string;
    created?: string;
  }>;
};

type IdeasUrlValues = {
  q?: string;
  status?: string;
  category?: string;
  priority?: string;
  sort?: string;
};

function normalizeStatus(
  value: string | undefined
): IdeaStatus | undefined {
  if (
    value === IdeaStatus.DRAFT ||
    value === IdeaStatus.PENDING ||
    value === IdeaStatus.REVIEWING ||
    value === IdeaStatus.NEEDS_REVISION ||
    value === IdeaStatus.FEASIBLE ||
    value === IdeaStatus.NOT_FEASIBLE ||
    value === IdeaStatus.APPROVED ||
    value === IdeaStatus.CONVERTED_TO_PROJECT ||
    value === IdeaStatus.PAUSED
  ) {
    return value;
  }

  return undefined;
}

function normalizePriority(
  value: string | undefined
): IdeaPriority | undefined {
  if (
    value === IdeaPriority.LOW ||
    value === IdeaPriority.MEDIUM ||
    value === IdeaPriority.HIGH ||
    value === IdeaPriority.URGENT
  ) {
    return value;
  }

  return undefined;
}

function normalizeSort(value: string | undefined) {
  const allowedSorts = [
    "updated-desc",
    "created-desc",
    "created-asc",
    "priority-desc",
    "score-desc",
    "title-asc",
  ];

  if (value && allowedSorts.includes(value)) {
    return value;
  }

  return "updated-desc";
}

function getStatusLabel(status: IdeaStatus) {
  const labels: Record<IdeaStatus, string> = {
    DRAFT: "Bản nháp",
    PENDING: "Chờ đánh giá",
    REVIEWING: "Đang đánh giá",
    NEEDS_REVISION: "Cần chỉnh sửa",
    FEASIBLE: "Khả thi",
    NOT_FEASIBLE: "Không khả thi",
    APPROVED: "Đã phê duyệt",
    CONVERTED_TO_PROJECT: "Đã thành dự án",
    PAUSED: "Tạm dừng",
  };

  return labels[status];
}

function getStatusClasses(status: IdeaStatus) {
  switch (status) {
    case IdeaStatus.PENDING:
      return "border-amber-400/25 bg-amber-400/10 text-amber-300";

    case IdeaStatus.REVIEWING:
      return "border-blue-400/25 bg-blue-400/10 text-blue-300";

    case IdeaStatus.NEEDS_REVISION:
      return "border-orange-400/25 bg-orange-400/10 text-orange-300";

    case IdeaStatus.FEASIBLE:
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";

    case IdeaStatus.NOT_FEASIBLE:
      return "border-red-400/25 bg-red-400/10 text-red-300";

    case IdeaStatus.APPROVED:
      return "border-cyan-400/25 bg-cyan-400/10 text-cyan-300";

    case IdeaStatus.CONVERTED_TO_PROJECT:
      return "border-purple-400/25 bg-purple-400/10 text-purple-300";

    case IdeaStatus.PAUSED:
      return "border-slate-400/25 bg-slate-400/10 text-slate-300";

    case IdeaStatus.DRAFT:
    default:
      return "border-slate-600 bg-slate-700/60 text-slate-300";
  }
}

function getPriorityLabel(priority: IdeaPriority) {
  const labels: Record<IdeaPriority, string> = {
    LOW: "Thấp",
    MEDIUM: "Trung bình",
    HIGH: "Cao",
    URGENT: "Khẩn cấp",
  };

  return labels[priority];
}

function getPriorityClasses(priority: IdeaPriority) {
  switch (priority) {
    case IdeaPriority.LOW:
      return "text-slate-400";

    case IdeaPriority.MEDIUM:
      return "text-blue-300";

    case IdeaPriority.HIGH:
      return "text-amber-300";

    case IdeaPriority.URGENT:
      return "text-red-300";

    default:
      return "text-slate-400";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getOrderBy(
  sort: string
): Prisma.IdeaOrderByWithRelationInput {
  switch (sort) {
    case "created-desc":
      return {
        createdAt: "desc",
      };

    case "created-asc":
      return {
        createdAt: "asc",
      };

    case "priority-desc":
      return {
        priority: "desc",
      };

    case "score-desc":
      return {
        averageScore: {
          sort: "desc",
          nulls: "last",
        },
      };

    case "title-asc":
      return {
        title: "asc",
      };

    case "updated-desc":
    default:
      return {
        updatedAt: "desc",
      };
  }
}

function buildIdeasUrl(
  currentValues: IdeasUrlValues,
  changes: Partial<IdeasUrlValues>
) {
  const values = {
    ...currentValues,
    ...changes,
  };

  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value && value.trim().length > 0) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();

  return queryString
    ? `/ideas?${queryString}`
    : "/ideas";
}

export default async function IdeasPage({
  searchParams,
}: IdeasPageProps) {
  const query = await searchParams;

  const keyword = query.q?.trim() ?? "";
  const selectedStatus = normalizeStatus(query.status);
  const selectedPriority = normalizePriority(query.priority);
  const selectedCategory = query.category?.trim() ?? "";
  const selectedSort = normalizeSort(query.sort);

  const where: Prisma.IdeaWhereInput = {
    ...(keyword
      ? {
          OR: [
            {
              code: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              summary: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),

    ...(selectedStatus
      ? {
          status: selectedStatus,
        }
      : {}),

    ...(selectedPriority
      ? {
          priority: selectedPriority,
        }
      : {}),

    ...(selectedCategory
      ? {
          categoryId: selectedCategory,
        }
      : {}),
  };

  const [
    ideas,
    categories,
    totalIdeas,
    reviewingIdeas,
    feasibleIdeas,
    contributors,
  ] = await Promise.all([
    prisma.idea.findMany({
      where,
      include: {
        category: true,
        creator: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: getOrderBy(selectedSort),
    }),

    prisma.ideaCategory.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.idea.count(),

    prisma.idea.count({
      where: {
        status: {
          in: [
            IdeaStatus.PENDING,
            IdeaStatus.REVIEWING,
            IdeaStatus.NEEDS_REVISION,
          ],
        },
      },
    }),

    prisma.idea.count({
      where: {
        status: {
          in: [
            IdeaStatus.FEASIBLE,
            IdeaStatus.APPROVED,
            IdeaStatus.CONVERTED_TO_PROJECT,
          ],
        },
      },
    }),

    prisma.user.count({
      where: {
        ideas: {
          some: {},
        },
      },
    }),
  ]);

  const currentFilters: IdeasUrlValues = {
    q: keyword,
    status: selectedStatus ?? "",
    category: selectedCategory,
    priority: selectedPriority ?? "",
    sort: selectedSort,
  };

  const hasFilters =
    keyword.length > 0 ||
    Boolean(selectedStatus) ||
    Boolean(selectedPriority) ||
    selectedCategory.length > 0;

  return (
    <div className="mx-auto min-w-0 max-w-[1600px] space-y-6">
      {/* Tiêu đề */}
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            Quản lý ý tưởng nghiên cứu
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
            Kho ý tưởng
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Lưu trữ, tìm kiếm và đánh giá các đề xuất nghiên cứu,
            sản phẩm STEM, robot, IoT và trí tuệ nhân tạo.
          </p>
        </div>

        <Link
          href="/ideas/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus className="size-4" />
          Đề xuất ý tưởng mới
        </Link>
      </section>

      {/* Thông báo tạo thành công */}
      {query.created === "1" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
          Ý tưởng mới đã được tạo thành công.
        </div>
      )}

      {/* Tìm kiếm và bộ lọc */}
      <section className="min-w-0 rounded-2xl border border-slate-800 bg-[#111c30] p-4">
        <form
          action="/ideas"
          method="get"
          className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[minmax(260px,2fr)_repeat(4,minmax(145px,1fr))_120px]"
        >
          <div className="relative min-w-0 md:col-span-2 xl:col-span-3 2xl:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              name="q"
              defaultValue={keyword}
              placeholder="Tìm theo mã, tiêu đề, mô tả..."
              className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-[#0a1527] pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          <select
            name="status"
            defaultValue={selectedStatus ?? ""}
            className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-[#0a1527] px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="DRAFT">Bản nháp</option>
            <option value="PENDING">Chờ đánh giá</option>
            <option value="REVIEWING">Đang đánh giá</option>
            <option value="NEEDS_REVISION">
              Cần chỉnh sửa
            </option>
            <option value="FEASIBLE">Khả thi</option>
            <option value="NOT_FEASIBLE">
              Không khả thi
            </option>
            <option value="APPROVED">
              Đã phê duyệt
            </option>
            <option value="CONVERTED_TO_PROJECT">
              Đã chuyển thành dự án
            </option>
            <option value="PAUSED">Tạm dừng</option>
          </select>

          <select
            name="category"
            defaultValue={selectedCategory}
            className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-[#0a1527] px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
          >
            <option value="">Tất cả danh mục</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="priority"
            defaultValue={selectedPriority ?? ""}
            className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-[#0a1527] px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
          >
            <option value="">Tất cả ưu tiên</option>
            <option value="LOW">Thấp</option>
            <option value="MEDIUM">Trung bình</option>
            <option value="HIGH">Cao</option>
            <option value="URGENT">Khẩn cấp</option>
          </select>

          <select
            name="sort"
            defaultValue={selectedSort}
            className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-[#0a1527] px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
          >
            <option value="updated-desc">
              Mới cập nhật
            </option>
            <option value="created-desc">
              Mới tạo
            </option>
            <option value="created-asc">
              Cũ nhất
            </option>
            <option value="priority-desc">
              Ưu tiên cao
            </option>
            <option value="score-desc">
              Điểm cao nhất
            </option>
            <option value="title-asc">
              Tên A-Z
            </option>
          </select>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 md:col-span-2 xl:col-span-3 2xl:col-span-1"
          >
            <SlidersHorizontal className="size-4" />
            Áp dụng
          </button>
        </form>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <p className="text-sm text-slate-400">
              Tìm thấy{" "}
              <span className="font-semibold text-slate-100">
                {ideas.length}
              </span>{" "}
              ý tưởng phù hợp.
            </p>

            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-300"
            >
              <X className="size-4" />
              Xóa bộ lọc
            </Link>
          </div>
        )}
      </section>

      {/* Danh mục nhanh */}
      <section className="flex min-w-0 gap-2 overflow-x-auto rounded-2xl border border-slate-800 bg-[#111c30] p-3">
        <Link
          href={buildIdeasUrl(currentFilters, {
            category: "",
          })}
          className={[
            "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition",
            selectedCategory === ""
              ? "bg-cyan-400 text-slate-950"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
          ].join(" ")}
        >
          Tất cả
        </Link>

        {categories.map((category) => {
          const isActive =
            selectedCategory === category.id;

          return (
            <Link
              key={category.id}
              href={buildIdeasUrl(currentFilters, {
                category: category.id,
              })}
              className={[
                "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
              ].join(" ")}
            >
              {category.name}
            </Link>
          );
        })}
      </section>

      {/* Danh sách ý tưởng */}
      {ideas.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-700 bg-[#111c30] px-6 py-16 text-center">
          <Search className="mx-auto size-10 text-slate-600" />

          <h2 className="mt-4 font-semibold text-slate-200">
            Không tìm thấy ý tưởng
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Hãy thử thay đổi từ khóa hoặc điều kiện lọc.
          </p>

          <Link
            href="/ideas"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Xóa toàn bộ bộ lọc
          </Link>
        </section>
      ) : (
        <section className="grid min-w-0 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {ideas.map((idea) => (
            <article
              key={idea.id}
              className="group flex min-h-[300px] min-w-0 flex-col rounded-2xl border border-slate-800 bg-[#111c30] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-950/10"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={[
                    "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                    getStatusClasses(idea.status),
                  ].join(" ")}
                >
                  {getStatusLabel(idea.status)}
                </span>

                <div className="flex shrink-0 items-center gap-1 text-xs">
                  <Star className="size-3.5 text-amber-300" />

                  <span className="font-semibold text-slate-300">
                    {idea.averageScore !== null
                      ? idea.averageScore.toFixed(1)
                      : "--"}
                  </span>
                </div>
              </div>

              <div className="mt-5 min-w-0 flex-1">
                <p className="text-xs font-medium text-cyan-400">
                  {idea.code}
                </p>

                <Link
                  href={`/ideas/${idea.id}`}
                  className="mt-2 block break-words text-lg font-bold leading-7 text-slate-100 transition group-hover:text-cyan-300"
                >
                  {idea.title}
                </Link>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                  {idea.summary}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-400">
                  {idea.category?.name ??
                    "Chưa phân loại"}
                </span>

                <span
                  className={[
                    "rounded-md bg-slate-800 px-2 py-1 text-[11px]",
                    getPriorityClasses(idea.priority),
                  ].join(" ")}
                >
                  Ưu tiên:{" "}
                  {getPriorityLabel(idea.priority)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">
                    {idea.creator.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-300">
                      {idea.creator.name}
                    </p>

                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-600">
                      <CalendarDays className="size-3 shrink-0" />
                      {formatDate(idea.updatedAt)}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/ideas/${idea.id}`}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Chi tiết
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}

          {/* Card tạo ý tưởng */}
          <Link
            href="/ideas/new"
            className="group flex min-h-[300px] min-w-0 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#111c30]/60 p-8 text-center transition hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/5"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-700 bg-[#0a1527] transition group-hover:border-cyan-400/40">
              <Lightbulb className="size-6 text-cyan-400" />
            </div>

            <h2 className="mt-5 font-bold uppercase text-slate-100">
              Thêm ý tưởng mới
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Đóng góp một giải pháp nghiên cứu hoặc sản phẩm
              công nghệ mới cho SMLab.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
              <Plus className="size-4" />
              Tạo đề xuất
            </span>
          </Link>
        </section>
      )}

      {/* Thống kê */}
      <section className="grid overflow-hidden rounded-2xl border border-slate-800 bg-[#111c30] sm:grid-cols-2 xl:grid-cols-4">
        <div className="border-b border-slate-800 p-5 sm:border-r xl:border-b-0">
          <div className="flex items-center gap-3">
            <Lightbulb className="size-5 text-cyan-400" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Tổng ý tưởng
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-100">
                {totalIdeas}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-800 p-5 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-3">
            <Clock3 className="size-5 text-amber-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Đang đánh giá
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-100">
                {reviewingIdeas}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Khả thi
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-300">
                {feasibleIdeas}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3">
            <UsersRound className="size-5 text-purple-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Người đóng góp
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-100">
                {contributors}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}