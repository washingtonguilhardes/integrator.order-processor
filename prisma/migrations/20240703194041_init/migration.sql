-- CreateEnum
CREATE TYPE "EnumStatus" AS ENUM ('DONE', 'NEED_ATTENTION');
-- CreateTable
CREATE TABLE "OrderUser" (
  "user_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  CONSTRAINT "OrderUser_pkey" PRIMARY KEY ("user_id")
);
-- CreateTable
CREATE TABLE "Order" (
  "order_id" SERIAL NOT NULL,
  "user_id" INTEGER NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "total" DOUBLE PRECISION NOT NULL,
  CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);
-- CreateTable
CREATE TABLE "OrderItem" (
  "id" SERIAL NOT NULL,
  "order_id" INTEGER NOT NULL,
  "value" DOUBLE PRECISION NOT NULL,
  "product_id" INTEGER NOT NULL,
  "comments" TEXT,
  "status" "EnumStatus",
  CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "Order"
ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "OrderUser"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
