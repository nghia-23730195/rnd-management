import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewIdeaPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/ideas"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300"
      >
        <ArrowLeft className="size-4" />
        Quay lại Kho ý tưởng
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-cyan-400">
          Kho ý tưởng
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Đề xuất ý tưởng mới
        </h1>

        <p className="mt-2 text-slate-400">
          Nhập thông tin cơ bản của ý tưởng R&amp;D.
        </p>
      </div>

      <form className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-[#111c30] p-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium"
          >
            Tên ý tưởng
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Nhập tên ý tưởng..."
            className="h-11 w-full rounded-lg border border-slate-700 bg-[#091426] px-4 outline-none placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="summary"
            className="text-sm font-medium"
          >
            Mô tả ngắn
          </label>

          <textarea
            id="summary"
            name="summary"
            required
            rows={4}
            placeholder="Mô tả nội dung chính của ý tưởng..."
            className="w-full resize-y rounded-lg border border-slate-700 bg-[#091426] px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium"
            >
              Lĩnh vực
            </label>

            <select
              id="category"
              name="category"
              className="h-11 w-full rounded-lg border border-slate-700 bg-[#091426] px-4 outline-none focus:border-cyan-400"
            >
              <option value="">Chọn lĩnh vực</option>
              <option value="stem">Mô hình STEM</option>
              <option value="robot">Robot và tự động hóa</option>
              <option value="ai">Trí tuệ nhân tạo</option>
              <option value="iot">IoT và cảm biến</option>
              <option value="software">Phần mềm</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="text-sm font-medium"
            >
              Mức độ ưu tiên
            </label>

            <select
              id="priority"
              name="priority"
              defaultValue="MEDIUM"
              className="h-11 w-full rounded-lg border border-slate-700 bg-[#091426] px-4 outline-none focus:border-cyan-400"
            >
              <option value="LOW">Thấp</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HIGH">Cao</option>
              <option value="URGENT">Khẩn cấp</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 pt-6">
          <Link
            href="/ideas"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            Hủy
          </Link>

          <button
            type="submit"
            className="h-10 rounded-lg bg-cyan-400 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Lưu ý tưởng
          </button>
        </div>
      </form>
    </div>
  );
}