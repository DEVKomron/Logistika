-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'superAdmin', 'user', 'driver');

-- CreateEnum
CREATE TYPE "PayerEnum" AS ENUM ('SENDER', 'RECEIVER', 'SPLIT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'CASH', 'TRANSFER');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tg_link" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "role" "Role" DEFAULT 'user',
    "hashed_password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment" "PayerEnum"[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "vehice_number" TEXT NOT NULL,
    "experience_year" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "driver_lisence_front" TEXT NOT NULL,
    "driver_lisence_back" TEXT NOT NULL,
    "technical_passport_front" TEXT NOT NULL,
    "technical_passport_back" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "netWeight" DOUBLE PRECISION NOT NULL,
    "dimensions" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "roundTrip" BOOLEAN NOT NULL,
    "partialPossession" BOOLEAN NOT NULL,
    "receiverPhone" INTEGER NOT NULL,
    "payer" "PayerEnum" NOT NULL DEFAULT 'SENDER',
    "description" TEXT NOT NULL,
    "priceOffer" INTEGER NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "refrigerator" BOOLEAN NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "driverId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'FAILED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH',

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "transportId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportDriver" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "transportId" INTEGER NOT NULL,
    "power_of_attorney" TEXT NOT NULL,

    CONSTRAINT "transportDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raiting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raiting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "transportTypeId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dimensions" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "transportNumber" TEXT NOT NULL,
    "years" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "technicalPassportFront" TEXT NOT NULL,
    "technicalPassportBack" TEXT NOT NULL,
    "technicalSeriaNumber" TEXT NOT NULL,

    CONSTRAINT "transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "refrigerator" BOOLEAN NOT NULL,

    CONSTRAINT "transport_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportDriver" ADD CONSTRAINT "transportDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportDriver" ADD CONSTRAINT "transportDriver_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raiting" ADD CONSTRAINT "raiting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raiting" ADD CONSTRAINT "raiting_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transport" ADD CONSTRAINT "transport_transportTypeId_fkey" FOREIGN KEY ("transportTypeId") REFERENCES "transport_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
