ALTER TYPE "payment_method" ADD VALUE 'true_wallet';--> statement-breakpoint
ALTER TABLE "room_laundry_item" ADD COLUMN "payment_method" "payment_method" NOT NULL;