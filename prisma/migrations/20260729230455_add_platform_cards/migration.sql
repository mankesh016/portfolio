-- CreateTable
CREATE TABLE "PlatformCard" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "subtitle" TEXT,
    "logoUrl" TEXT,
    "infoLines" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlatformCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformCardImage" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlatformCardImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatformCardImage" ADD CONSTRAINT "PlatformCardImage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PlatformCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
