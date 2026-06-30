-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RND_MANAGER', 'PROJECT_MANAGER', 'REVIEWER', 'MEMBER', 'VIEWER');

-- CreateEnum
CREATE TYPE "IdeaStatus" AS ENUM ('DRAFT', 'PENDING', 'REVIEWING', 'NEEDS_REVISION', 'FEASIBLE', 'NOT_FEASIBLE', 'APPROVED', 'CONVERTED_TO_PROJECT', 'PAUSED');

-- CreateEnum
CREATE TYPE "IdeaPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeaCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdeaCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "problem" TEXT,
    "proposedSolution" TEXT,
    "novelty" TEXT,
    "targetUsers" TEXT,
    "expectedResult" TEXT,
    "estimatedDuration" INTEGER,
    "estimatedBudget" DECIMAL(15,2),
    "priority" "IdeaPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "IdeaStatus" NOT NULL DEFAULT 'DRAFT',
    "averageScore" DOUBLE PRECISION,
    "creatorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_active_idx" ON "User"("active");

-- CreateIndex
CREATE UNIQUE INDEX "IdeaCategory_name_key" ON "IdeaCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Idea_code_key" ON "Idea"("code");

-- CreateIndex
CREATE INDEX "Idea_creatorId_idx" ON "Idea"("creatorId");

-- CreateIndex
CREATE INDEX "Idea_categoryId_idx" ON "Idea"("categoryId");

-- CreateIndex
CREATE INDEX "Idea_status_idx" ON "Idea"("status");

-- CreateIndex
CREATE INDEX "Idea_priority_idx" ON "Idea"("priority");

-- CreateIndex
CREATE INDEX "Idea_createdAt_idx" ON "Idea"("createdAt");

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "IdeaCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
