import { FolderKanban } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function ProjectsPage() {
  return (
    <ModulePlaceholder
      title="Quản lý dự án"
      description="Theo dõi tiến độ, roadmap, BOM và nhân sự dự án."
      icon={FolderKanban}
    />
  );
}