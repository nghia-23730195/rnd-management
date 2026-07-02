"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/user";
import {
  IdeaPriority,
  IdeaStatus,
} from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

function getRequiredText(
  formData: FormData,
  fieldName: string,
  label: string
) {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} không được để trống.`);
  }

  return value.trim();
}

function getOptionalText(
  formData: FormData,
  fieldName: string
) {
  const value = formData.get(fieldName);

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue || null;
}

function getOptionalInteger(
  formData: FormData,
  fieldName: string
) {
  const value = formData.get(fieldName);

  if (
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    return null;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue < 0
  ) {
    throw new Error(
      "Thời gian dự kiến phải là số nguyên không âm."
    );
  }

  return parsedValue;
}

function getOptionalNumber(
  formData: FormData,
  fieldName: string
) {
  const value = formData.get(fieldName);

  if (
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    return null;
  }

  const parsedValue = Number(value);

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue < 0
  ) {
    throw new Error(
      "Kinh phí dự kiến phải là số không âm."
    );
  }

  return parsedValue;
}

function normalizePriority(
  value: FormDataEntryValue | null
): IdeaPriority {
  if (
    value === IdeaPriority.LOW ||
    value === IdeaPriority.MEDIUM ||
    value === IdeaPriority.HIGH ||
    value === IdeaPriority.URGENT
  ) {
    return value;
  }

  return IdeaPriority.MEDIUM;
}

function normalizeStatus(
  value: FormDataEntryValue | null
): IdeaStatus {
  if (
    value === IdeaStatus.DRAFT ||
    value === IdeaStatus.PENDING ||
    value === IdeaStatus.REVIEWING ||
    value === IdeaStatus.NEEDS_REVISION ||
    value === IdeaStatus.FEASIBLE ||
    value === IdeaStatus.NOT_FEASIBLE ||
    value === IdeaStatus.APPROVED ||
    value === IdeaStatus.CONVERTED_TO_PROJECT ||
    value === IdeaStatus.PAUSED
  ) {
    return value;
  }

  throw new Error("Trạng thái ý tưởng không hợp lệ.");
}

async function generateIdeaCode() {
  const currentYear = new Date().getFullYear();

  const ideaCount = await prisma.idea.count({
    where: {
      code: {
        startsWith: `IDEA-${currentYear}-`,
      },
    },
  });

  let sequence = ideaCount + 1;

  while (true) {
    const code = `IDEA-${currentYear}-${String(
      sequence
    ).padStart(3, "0")}`;

    const existingIdea = await prisma.idea.findUnique({
      where: {
        code,
      },
      select: {
        id: true,
      },
    });

    if (!existingIdea) {
      return code;
    }

    sequence += 1;
  }
}

export async function createIdea(formData: FormData) {
  const currentUser = await requireUser();

  const title = getRequiredText(
    formData,
    "title",
    "Tên ý tưởng"
  );

  const summary = getRequiredText(
    formData,
    "summary",
    "Mô tả ngắn"
  );

  const categoryId = getRequiredText(
    formData,
    "categoryId",
    "Danh mục"
  );

  const priority = normalizePriority(
    formData.get("priority")
  );

  const problem = getOptionalText(
    formData,
    "problem"
  );

  const proposedSolution = getOptionalText(
    formData,
    "proposedSolution"
  );

  const novelty = getOptionalText(
    formData,
    "novelty"
  );

  const targetUsers = getOptionalText(
    formData,
    "targetUsers"
  );

  const expectedResult = getOptionalText(
    formData,
    "expectedResult"
  );

  const estimatedDuration = getOptionalInteger(
    formData,
    "estimatedDuration"
  );

  const estimatedBudget = getOptionalNumber(
    formData,
    "estimatedBudget"
  );

  const category =
    await prisma.ideaCategory.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
      },
    });

  if (!category) {
    throw new Error(
      "Danh mục ý tưởng không tồn tại."
    );
  }

  const code = await generateIdeaCode();

  await prisma.idea.create({
    data: {
      code,
      title,
      summary,
      problem,
      proposedSolution,
      novelty,
      targetUsers,
      expectedResult,
      estimatedDuration,
      estimatedBudget,
      priority,
      status: IdeaStatus.DRAFT,
      creatorId: currentUser.id,
      categoryId: category.id,
    },
  });

  revalidatePath("/ideas");
  revalidatePath("/dashboard");

  redirect("/ideas?created=1");
}

export async function updateIdea(
  ideaId: string,
  formData: FormData
) {
  const currentUser = await requireUser();

  const title = getRequiredText(
    formData,
    "title",
    "Tên ý tưởng"
  );

  const summary = getRequiredText(
    formData,
    "summary",
    "Mô tả ngắn"
  );

  const categoryId = getRequiredText(
    formData,
    "categoryId",
    "Danh mục"
  );

  const priority = normalizePriority(
    formData.get("priority")
  );

  const problem = getOptionalText(
    formData,
    "problem"
  );

  const proposedSolution = getOptionalText(
    formData,
    "proposedSolution"
  );

  const novelty = getOptionalText(
    formData,
    "novelty"
  );

  const targetUsers = getOptionalText(
    formData,
    "targetUsers"
  );

  const expectedResult = getOptionalText(
    formData,
    "expectedResult"
  );

  const estimatedDuration = getOptionalInteger(
    formData,
    "estimatedDuration"
  );

  const estimatedBudget = getOptionalNumber(
    formData,
    "estimatedBudget"
  );

  const existingIdea = await prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
    select: {
      id: true,
      creatorId: true,
    },
  });

  if (!existingIdea) {
    throw new Error("Không tìm thấy ý tưởng.");
  }

  const canEdit =
    currentUser.role === "ADMIN" ||
    currentUser.role === "RND_MANAGER" ||
    existingIdea.creatorId === currentUser.id;

  if (!canEdit) {
    throw new Error(
      "Bạn không có quyền chỉnh sửa ý tưởng này."
    );
  }

  const category =
    await prisma.ideaCategory.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
      },
    });

  if (!category) {
    throw new Error(
      "Danh mục ý tưởng không tồn tại."
    );
  }

  await prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      title,
      summary,
      categoryId: category.id,
      priority,
      problem,
      proposedSolution,
      novelty,
      targetUsers,
      expectedResult,
      estimatedDuration,
      estimatedBudget,
    },
  });

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${ideaId}`);
  revalidatePath(`/ideas/${ideaId}/edit`);
  revalidatePath("/dashboard");

  redirect(`/ideas/${ideaId}?updated=1`);
}

export async function updateIdeaStatus(
  ideaId: string,
  formData: FormData
) {
  const currentUser = await requireUser();

  const canUpdateStatus =
    currentUser.role === "ADMIN" ||
    currentUser.role === "RND_MANAGER";

  if (!canUpdateStatus) {
    throw new Error(
      "Bạn không có quyền cập nhật trạng thái ý tưởng."
    );
  }

  const status = normalizeStatus(
    formData.get("status")
  );

  const existingIdea = await prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!existingIdea) {
    throw new Error("Không tìm thấy ý tưởng.");
  }

  await prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${ideaId}`);
  revalidatePath("/dashboard");

  redirect(`/ideas/${ideaId}?statusUpdated=1`);
}