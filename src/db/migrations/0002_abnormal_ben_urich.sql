ALTER TABLE "camp_major" ALTER COLUMN "camp_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_major" ALTER COLUMN "major_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_participant" ALTER COLUMN "camp_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_participant" ALTER COLUMN "participant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_staff" ALTER COLUMN "camp_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_staff" ALTER COLUMN "staff_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_laundry_item" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_laundry_item" ALTER COLUMN "item_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room" ALTER COLUMN "camp_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_participant" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_participant" ALTER COLUMN "camp_participant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_staff" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "room_staff" ALTER COLUMN "camp_staff_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "staff_account" ALTER COLUMN "staff_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "camp" ADD CONSTRAINT "camp_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "major" ADD CONSTRAINT "major_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "laundry_item" ADD CONSTRAINT "laundry_item_name_unique" UNIQUE("name");