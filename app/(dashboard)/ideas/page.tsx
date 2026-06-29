import { Lightbulb } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function IdeasPage() {
  return (
    <ModulePlaceholder
      title="Kho ý tưởng"
      description="Lưu trữ, phân loại và đánh giá các ý tưởng R&D."
      icon={Lightbulb}
    />
  );
}