import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Lightbulb,
  Save,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import { updateIdea } from "../../actions";

export const dynamic = "force-dynamic";

type EditIdeaPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditIdeaPage({
  params,
}: EditIdeaPageProps) {
  const { id } = await params;

  const [idea, categories] = await Promise.all([
    prisma.idea.findUnique({
      where: {
        id,
      },
    }),

    prisma.ideaCategory.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!idea) {
    notFound();
  }

  const updateIdeaWithId = updateIdea.bind(
    null,
    idea.id
  );

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={`/ideas/${idea.id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
          >
            <ArrowLeft className="size-4" />
            Quay lại chi tiết ý tưởng
          </Link>

          <p className="mt-5 text-sm font-medium text-cyan-400">
            {idea.code}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-100">
            Chỉnh sửa ý tưởng
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Cập nhật nội dung, danh mục, mức ưu tiên
            và kế hoạch dự kiến.
          </p>
        </div>

        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
          <Lightbulb className="size-7 text-cyan-400" />
        </div>
      </header>

      <form
        action={updateIdeaWithId}
        className="mt-8 space-y-6"
      >
        <section className="rounded-2xl border border-slate-800 bg-[#111c30] p-5 md:p-7">
          <div className="border-b border-slate-800 pb-5">
            <h2 className="text-lg font-semibold text-slate-100">
              Thông tin cơ bản
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Các trường có dấu * là bắt buộc.
            </p>
          </div>

          <div className="mt-6 grid gap-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Tên ý tưởng *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={5}
                maxLength={200}
                defaultValue={idea.title}
                className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label
                htmlFor="summary"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Mô tả ngắn *
              </label>

              <textarea
                id="summary"
                name="summary"
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                defaultValue={idea.summary}
                className="w-full resize-y rounded-xl border border-slate-700 bg-[#0a1527] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="categoryId"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Danh mục *
                </label>

                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  defaultValue={idea.categoryId ?? ""}
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                >
                  <option value="" disabled>
                    Chọn danh mục
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Mức ưu tiên
                </label>

                <select
                  id="priority"
                  name="priority"
                  defaultValue={idea.priority}
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                >
                  <option value="LOW">
                    Thấp
                  </option>

                  <option value="MEDIUM">
                    Trung bình
                  </option>

                  <option value="HIGH">
                    Cao
                  </option>

                  <option value="URGENT">
                    Khẩn cấp
                  </option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#111c30] p-5 md:p-7">
          <div className="border-b border-slate-800 pb-5">
            <h2 className="text-lg font-semibold text-slate-100">
              Phân tích ý tưởng
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cập nhật vấn đề, giải pháp và tính mới
              của ý tưởng.
            </p>
          </div>

          <div className="mt-6 grid gap-6">
            <div>
              <label
                htmlFor="problem"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Vấn đề cần giải quyết
              </label>

              <textarea
                id="problem"
                name="problem"
                rows={4}
                defaultValue={idea.problem ?? ""}
                className="w-full resize-y rounded-xl border border-slate-700 bg-[#0a1527] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label
                htmlFor="proposedSolution"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Giải pháp đề xuất
              </label>

              <textarea
                id="proposedSolution"
                name="proposedSolution"
                rows={5}
                defaultValue={
                  idea.proposedSolution ?? ""
                }
                className="w-full resize-y rounded-xl border border-slate-700 bg-[#0a1527] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label
                htmlFor="novelty"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Tính mới và điểm khác biệt
              </label>

              <textarea
                id="novelty"
                name="novelty"
                rows={3}
                defaultValue={idea.novelty ?? ""}
                className="w-full resize-y rounded-xl border border-slate-700 bg-[#0a1527] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#111c30] p-5 md:p-7">
          <div className="border-b border-slate-800 pb-5">
            <h2 className="text-lg font-semibold text-slate-100">
              Kế hoạch dự kiến
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cập nhật đối tượng, kết quả, thời gian
              và kinh phí.
            </p>
          </div>

          <div className="mt-6 grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="targetUsers"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Đối tượng sử dụng
                </label>

                <input
                  id="targetUsers"
                  name="targetUsers"
                  type="text"
                  defaultValue={idea.targetUsers ?? ""}
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="expectedResult"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Kết quả dự kiến
                </label>

                <input
                  id="expectedResult"
                  name="expectedResult"
                  type="text"
                  defaultValue={
                    idea.expectedResult ?? ""
                  }
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="estimatedDuration"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Thời gian dự kiến
                </label>

                <div className="relative">
                  <input
                    id="estimatedDuration"
                    name="estimatedDuration"
                    type="number"
                    min={0}
                    step={1}
                    defaultValue={
                      idea.estimatedDuration ?? ""
                    }
                    className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 pr-20 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    tháng
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="estimatedBudget"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Kinh phí dự kiến
                </label>

                <div className="relative">
                  <input
                    id="estimatedBudget"
                    name="estimatedBudget"
                    type="number"
                    min={0}
                    step={1000}
                    defaultValue={
                      idea.estimatedBudget !== null
                        ? Number(
                            idea.estimatedBudget
                          )
                        : ""
                    }
                    className="h-12 w-full rounded-xl border border-slate-700 bg-[#0a1527] px-4 pr-16 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
          <Link
            href={`/ideas/${idea.id}`}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 px-6 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Hủy
          </Link>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            <Save className="size-4" />
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}