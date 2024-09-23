-- CreateEnum
CREATE TYPE "EnumStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'SHIPPED');

-- CreateEnum
CREATE TYPE "EnumPaymentMethod" AS ENUM ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "buyer" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "EnumStatus" NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "paymentMethod" "EnumPaymentMethod" NOT NULL,
    "notes" TEXT,
    "promo" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
