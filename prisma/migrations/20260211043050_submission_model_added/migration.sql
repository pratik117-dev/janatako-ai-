-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "question" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
