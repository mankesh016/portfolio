-- CreateTable
CREATE TABLE "JourneyEvent" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "dateLabel" TEXT,
    "statusLabel" TEXT,
    "statusVariant" TEXT NOT NULL DEFAULT 'neutral',
    "logoUrl" TEXT,
    "heading" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "linkType" TEXT,
    "linkLabel" TEXT,
    "linkUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JourneyEvent_pkey" PRIMARY KEY ("id")
);
