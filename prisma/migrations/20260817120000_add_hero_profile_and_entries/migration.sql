-- CreateTable
CREATE TABLE "HeroProfile" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "mail" TEXT,
    "resumeUrl" TEXT,
    "location" TEXT,
    "isOpenToWork" BOOLEAN NOT NULL DEFAULT false,
    "openToWorkText" TEXT,

    CONSTRAINT "HeroProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroEntry" (
    "id" TEXT NOT NULL,
    "logoUrl" TEXT,
    "text" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HeroEntry_pkey" PRIMARY KEY ("id")
);
