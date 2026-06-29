import { Settings } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function SettingsPage() {
  return (
    <ModulePlaceholder
      title="Cài đặt hệ thống"
      description="Cấu hình danh mục, phân quyền và thông tin hệ thống."
      icon={Settings}
    />
  );
}