-- CreateTable
CREATE TABLE "CpProfileCard" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "iconSlug" TEXT,
    "sinceMonth" INTEGER,
    "sinceYear" INTEGER NOT NULL,
    "rankTitle" TEXT NOT NULL,
    "rankSubtitle" TEXT,
    "peak" INTEGER NOT NULL,
    "contests" INTEGER NOT NULL,
    "solved" INTEGER NOT NULL,
    "bestRank" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CpProfileCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CpAchievementCard" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CpAchievementCard_pkey" PRIMARY KEY ("id")
);
