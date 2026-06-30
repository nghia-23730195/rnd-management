import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import {
  PrismaClient,
  UserRole,
} from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Thiếu DATABASE_URL");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Bắt đầu seed dữ liệu...");

  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const user = await prisma.user.upsert({
    where: {
      email: "admin@smlab.vn",
    },
    update: {
      name: "Quản trị viên",
      passwordHash,
      role: UserRole.ADMIN,
      active: true,
    },
    create: {
      name: "Quản trị viên",
      email: "admin@smlab.vn",
      passwordHash,
      role: UserRole.ADMIN,
      active: true,
    },
  });

  console.log("Đã tạo người dùng:", user.email);

  const categories = [
    {
      name: "Trí tuệ nhân tạo",
      description: "AI, học máy và thị giác máy tính",
      color: "#22d3ee",
    },
    {
      name: "Robot và tự động hóa",
      description: "Robot, cơ điện tử và điều khiển tự động",
      color: "#3b82f6",
    },
    {
      name: "IoT và cảm biến",
      description: "Thiết bị kết nối và hệ thống cảm biến",
      color: "#10b981",
    },
    {
      name: "Năng lượng tái tạo",
      description: "Năng lượng mặt trời, gió và tiết kiệm năng lượng",
      color: "#f59e0b",
    },
    {
      name: "Mô hình STEM",
      description: "Mô hình giáo dục khoa học và kỹ thuật",
      color: "#a855f7",
    },
  ];

  for (const category of categories) {
    const savedCategory = await prisma.ideaCategory.upsert({
      where: {
        name: category.name,
      },
      update: {
        description: category.description,
        color: category.color,
      },
      create: category,
    });

    console.log("Đã tạo danh mục:", savedCategory.name);
  }

  const userCount = await prisma.user.count();
  const categoryCount = await prisma.ideaCategory.count();
  const ideaCount = await prisma.idea.count();

  console.log({
    userCount,
    categoryCount,
    ideaCount,
  });

  console.log("Seed dữ liệu thành công.");
}

main()
  .catch((error) => {
    console.error("Lỗi seed dữ liệu:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });