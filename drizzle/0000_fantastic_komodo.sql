CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"discord_id" varchar(255),
	"email" varchar(100) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"hashed_password" varchar(255),
	"avatar" varchar(255),
	"stripe_subscription_id" varchar(191),
	"stripe_price_id" varchar(191),
	"stripe_customer_id" varchar(191),
	"stripe_current_period_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "session_user_indx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_email_indx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_discord_indx" ON "users" USING btree ("discord_id");