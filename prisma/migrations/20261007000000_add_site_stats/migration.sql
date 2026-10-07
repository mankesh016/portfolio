-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "visitorCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SiteStats_pkey" PRIMARY KEY ("id")
);

-- Seed: ~100 visitors before the counter existed
INSERT INTO "SiteStats" ("id", "visitorCount") VALUES ('singleton', 100);
