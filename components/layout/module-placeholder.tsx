import type { LucideIcon } from "lucide-react";

type ModulePlaceholderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
}: ModulePlaceholderProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <p className="text-sm font-medium text-cyan-400">
          SMLab-R&amp;D
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {description}
        </p>
      </div>

      <section className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#111c30] p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-cyan-400/10">
          <Icon className="size-8 text-cyan-400" />
        </div>

        <h2 className="mt-5 text-xl font-semibold">
          Phân hệ đang được xây dựng
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Giao diện và chức năng của phân hệ này sẽ được bổ sung
          trong các bước tiếp theo.
        </p>
      </section>
    </div>
  );
}
