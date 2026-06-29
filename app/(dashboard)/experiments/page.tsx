import { Beaker } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function ExperimentsPage() {
  return (
    <ModulePlaceholder
      title="Quản lý thử nghiệm"
      description="Ghi nhận quy trình, mẫu thử và kết quả kiểm định."
      icon={Beaker}
    />
  );
}