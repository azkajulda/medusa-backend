import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260303010929 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "distributor" drop constraint if exists "distributor_email_unique";`);
    this.addSql(`create table if not exists "distributor" ("id" text not null, "name" text not null, "email" text not null, "phone" text not null, "address" text not null, "city" text not null, "state" text not null, "zip" text not null, "country" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "distributor_pkey" primary key ("id"), constraint limit_name_length check (LENGTH(name) <= 255));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_distributor_email_unique" ON "distributor" ("email") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_distributor_deleted_at" ON "distributor" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "distributor" cascade;`);
  }

}
