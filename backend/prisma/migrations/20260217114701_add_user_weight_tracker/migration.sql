-- CreateTable
CREATE TABLE "MeasurementLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DECIMAL(5,2),
    "waist" DECIMAL(5,2),
    "chest" DECIMAL(5,2),
    "leftArm" DECIMAL(5,2),
    "rightArm" DECIMAL(5,2),
    "leftLeg" DECIMAL(5,2),
    "rightLeg" DECIMAL(5,2),
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "MeasurementLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MeasurementLog_userId_recordedAt_idx" ON "MeasurementLog"("userId", "recordedAt");

-- AddForeignKey
ALTER TABLE "MeasurementLog" ADD CONSTRAINT "MeasurementLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
