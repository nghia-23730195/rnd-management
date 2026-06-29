import Link from "next/link";
import {
  ArrowRight,
  Beaker,
  BookOpen,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Lightbulb,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";

const recentIdeas = [
  {
    id: "IDEA-2026-001",
    title: "Hệ thống cảnh báo té ngã cho người cao tuổi",
    category: "Trí tuệ nhân tạo",
    status: "Đang đánh giá",
    author: "Nguyễn Văn A",
  },
  {
    id: "IDEA-2026-002",
    title: "Robot giám sát môi trường trong nhà kính",
    category: "Robot và IoT",
    status: "Khả thi",
    author: "Trần Văn B",
  },
  {
    id: "IDEA-2026-003",
    title: "Tủ sạc thông minh sử dụng năng lượng tái tạo",
    category: "Mô hình STEM",
    status: "Bản nháp",
    author: "Lê Thị C",
  },
];

const activeProjects = [
  {
    name: "Robot thám hiểm địa hình tự hành",
    code: "PRJ-2026-001",
    progress: 68,
  },
  {
    name: "Hệ thống phát hiện té ngã AI",
    code: "PRJ-2026-002",
    progress: 82,
  },
  {
    name: "Tủ sạc năng lượng mặt trời",
    code: "PRJ-2026-003",
    progress: 45,
  },
];

function getStatusClasses(status: string) {
  switch (status) {
    case "Khả thi":
      return "bg-emerald-400/10 text-emerald-300";
    case "Đang đánh giá":
      return "bg-amber-400/10 text-amber-300";
    default:
      return "bg-slate-700/70 text-slate-300";
  }
}

export default function DashboardPage() {
  const stats = [
    {
      title: "Tổng ý tưởng",
      value: "128",
      description: "Tăng 12 ý tưởng trong tháng này",
      icon: Lightbulb,
    },
    {
      title: "Đang đánh giá",
      value: "42",
      description: "8 ý tưởng cần xử lý trong tuần",
      icon: Clock3,
    },
    {
      title: "Ý tưởng khả thi",
      value: "15",
      description: "Có thể chuyển thành dự án R&D",
      icon: CheckCircle2,
    },
    {
      title: "Dự án đang chạy",
      value: "12",
      description: "3 dự án sắp đến thời hạn",
      icon: FolderKanban,
    },
  ];

  return (
    <div className="mx-auto min-w-0 max-w-[1600px] space-y-7 overflow-hidden">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            Tổng quan hệ thống
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
            Dashboard quản lý R&amp;D
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Theo dõi tình trạng ý tưởng, tiến độ dự án và hoạt
            động nghiên cứu của SMLab.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/ideas"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <Lightbulb className="size-4" />
            Xem kho ý tưởng
          </Link>

          <Link
            href="/ideas/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Tạo ý tưởng mới
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
        <div className="rounded-xl border border-slate-800 bg-[#111c30]">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-slate-100">
                Ý tưởng gần đây
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Các đề xuất mới được cập nhật
              </p>
            </div>

            <Link
              href="/ideas"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {recentIdeas.map((idea) => (
              <article
                key={idea.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-cyan-400">
                      {idea.id}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-[11px] font-medium",
                        getStatusClasses(idea.status),
                      ].join(" ")}
                    >
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="mt-2 truncate font-medium text-slate-100">
                    {idea.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {idea.category} · {idea.author}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={`Tùy chọn cho ${idea.title}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-700 hover:text-slate-200"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111c30]">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-slate-100">
                Dự án đang triển khai
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Tiến độ tổng quan
              </p>
            </div>

            <TrendingUp className="size-5 text-cyan-400" />
          </div>

          <div className="space-y-6 p-5">
            {activeProjects.map((project) => (
              <article key={project.code}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.code}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-cyan-300">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </article>
            ))}

            <Link
              href="/projects"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Xem toàn bộ dự án
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/experiments"
          className="group rounded-xl border border-slate-800 bg-[#111c30] p-5 transition hover:border-cyan-400/30"
        >
          <Beaker className="size-6 text-cyan-400" />

          <h2 className="mt-4 font-semibold">
            Quản lý thử nghiệm
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Theo dõi mẫu thử, quy trình và kết quả kiểm định.
          </p>
        </Link>

        <Link
          href="/library"
          className="group rounded-xl border border-slate-800 bg-[#111c30] p-5 transition hover:border-cyan-400/30"
        >
          <BookOpen className="size-6 text-cyan-400" />

          <h2 className="mt-4 font-semibold">
            Thư viện nghiên cứu
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Quản lý tài liệu, báo cáo và datasheet kỹ thuật.
          </p>
        </Link>

        <Link
          href="/projects"
          className="group rounded-xl border border-slate-800 bg-[#111c30] p-5 transition hover:border-cyan-400/30"
        >
          <FolderKanban className="size-6 text-cyan-400" />

          <h2 className="mt-4 font-semibold">
            Dự án R&amp;D
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Quản lý roadmap, nhân sự, BOM và ngân sách.
          </p>
        </Link>
      </section>
    </div>
  );
}