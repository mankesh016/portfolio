-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "photoSmallUrl" TEXT,
    "photoMediumUrl" TEXT,
    "githubUsername" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoLine" (
    "id" TEXT NOT NULL,
    "iconType" TEXT NOT NULL,
    "iconValue" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "href" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "InfoLine_pkey" PRIMARY KEY ("id")
);
