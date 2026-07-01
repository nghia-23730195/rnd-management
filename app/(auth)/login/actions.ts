"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ.")
    .max(255, "Email quá dài."),

  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(128, "Mật khẩu quá dài."),
});

function buildLoginErrorUrl(message: string) {
  return `/login?error=${encodeURIComponent(message)}`;
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ??
      "Thông tin đăng nhập không hợp lệ.";

    redirect(buildLoginErrorUrl(firstError));
  }

  const email = parsed.data.email.toLowerCase();
  const password = parsed.data.password;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      passwordHash: true,
      active: true,
    },
  });

  if (!user || !user.passwordHash || !user.active) {
    redirect(
      buildLoginErrorUrl(
        "Email hoặc mật khẩu không chính xác."
      )
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    redirect(
      buildLoginErrorUrl(
        "Email hoặc mật khẩu không chính xác."
      )
    );
  }

  await createSession(user.id);

  redirect("/dashboard");
}