-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyUrl" TEXT,
    "logoUrl" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "startMonth" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endMonth" INTEGER,
    "endYear" INTEGER,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "bulletsLong" JSONB NOT NULL,
    "summaryShort" TEXT NOT NULL,
    "skillsUsed" JSONB NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
