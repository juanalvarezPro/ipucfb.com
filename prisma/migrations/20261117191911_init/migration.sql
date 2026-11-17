-- CreateEnum
CREATE TYPE "RequestKind" AS ENUM ('PRAYER', 'VISIT', 'CONTACT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "kind" "RequestKind" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "wasapiOk" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "note" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "place" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouthRegistration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "birthDate" DATE NOT NULL,
    "gender" TEXT,
    "whatsapp" TEXT NOT NULL,
    "instagram" TEXT,
    "neighborhood" TEXT,
    "occupation" TEXT,
    "institution" TEXT,
    "grade" TEXT,
    "guardianName" TEXT,
    "guardianPhone" TEXT,
    "guardianRelation" TEXT,
    "timeInChurch" TEXT,
    "howArrived" TEXT,
    "baptized" TEXT,
    "holySpirit" TEXT,
    "familyAttends" TEXT,
    "musicGenres" TEXT[],
    "favoriteArtists" TEXT,
    "hobbies" TEXT[],
    "favoriteSport" TEXT,
    "favoriteFood" TEXT,
    "favoriteSocial" TEXT,
    "talents" TEXT[],
    "instrument" TEXT,
    "wantsToServe" TEXT[],
    "activities" TEXT[],
    "topics" TEXT[],
    "fridayAvailable" TEXT,
    "dreams" TEXT,
    "prayerRequest" TEXT,
    "forLeaders" TEXT,
    "dataConsent" BOOLEAN NOT NULL,
    "imageConsent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "YouthRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactRequest_kind_status_createdAt_idx" ON "ContactRequest"("kind", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Service_active_order_idx" ON "Service"("active", "order");

-- CreateIndex
CREATE INDEX "Event_published_startsAt_idx" ON "Event"("published", "startsAt");

-- CreateIndex
CREATE INDEX "YouthRegistration_createdAt_idx" ON "YouthRegistration"("createdAt");

-- CreateIndex
CREATE INDEX "YouthRegistration_birthDate_idx" ON "YouthRegistration"("birthDate");
