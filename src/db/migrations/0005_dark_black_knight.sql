DROP INDEX IF EXISTS "camp_major_idx_3";--> statement-breakpoint
DROP INDEX IF EXISTS "camp_major_idx_4";--> statement-breakpoint
DROP INDEX IF EXISTS "camp_major_idx_5";--> statement-breakpoint
ALTER TABLE "camp" ALTER COLUMN "hasLaundry" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "birthday" date NOT NULL;--> statement-breakpoint
ALTER TABLE "camp_major" DROP COLUMN IF EXISTS "deleted_at";--> statement-breakpoint
ALTER TABLE "camp_major" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "camp_major" DROP COLUMN IF EXISTS "updated_at";