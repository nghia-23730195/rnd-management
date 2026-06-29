import { BookOpen } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function LibraryPage() {
  return (
    <ModulePlaceholder
      title="Thư viện Research"
      description="Quản lý tài liệu khoa học, báo cáo nghiên cứu và tài nguyên kỹ thuật."
      icon={BookOpen}
    />
  );
}
