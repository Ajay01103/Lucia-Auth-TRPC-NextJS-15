CREATE TABLE "email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE INDEX "verification_code_user_indx" ON "email_verification_codes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_code_email_indx" ON "email_verification_codes" USING btree ("email");