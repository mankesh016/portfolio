-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "institutionUrl" TEXT,
    "logoUrl" TEXT,
    "degree" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);
