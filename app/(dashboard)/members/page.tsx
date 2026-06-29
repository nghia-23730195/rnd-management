import { Users } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export default function MembersPage() {
  return (
    <ModulePlaceholder
      title="Thành viên R&D"
      description="Quản lý thành viên, vai trò và nhóm nghiên cứu."
      icon={Users}
    />
  );
}