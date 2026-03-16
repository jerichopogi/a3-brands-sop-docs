/**
 * Seed Script for A3 Brands SOP Documentation
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npx tsx src/scripts/seed.ts
 *
 * This script:
 *   - Creates admin and developer user accounts
 *   - Inserts the 4 categories
 *   - Inserts all 7 SOPs with full content
 */

import { createClient } from "@supabase/supabase-js";
import { defaultSOPs, categories as categoryNames } from "../data/sops";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  console.log("Seeding A3 Brands SOP database...\n");

  // 1. Create users
  console.log("Creating users...");

  const { data: adminUser, error: adminErr } =
    await supabase.auth.admin.createUser({
      email: "admin@a3brands.com",
      password: "admin123",
      email_confirm: true,
      user_metadata: { display_name: "Admin User", role: "admin" },
    });

  if (adminErr) {
    if (adminErr.message.includes("already been registered")) {
      console.log("  Admin user already exists, skipping.");
    } else {
      console.error("  Error creating admin:", adminErr.message);
    }
  } else {
    console.log("  Created admin:", adminUser.user.email);
  }

  const { data: devUser, error: devErr } =
    await supabase.auth.admin.createUser({
      email: "dev@a3brands.com",
      password: "dev123",
      email_confirm: true,
      user_metadata: { display_name: "Developer", role: "user" },
    });

  if (devErr) {
    if (devErr.message.includes("already been registered")) {
      console.log("  Developer user already exists, skipping.");
    } else {
      console.error("  Error creating developer:", devErr.message);
    }
  } else {
    console.log("  Created developer:", devUser.user.email);
  }

  // 2. Insert categories
  console.log("\nInserting categories...");

  const categoryRecords = categoryNames.map((name, i) => ({
    name,
    sort_order: i,
  }));

  const { data: insertedCats, error: catErr } = await supabase
    .from("categories")
    .upsert(categoryRecords, { onConflict: "name" })
    .select();

  if (catErr) {
    console.error("  Error inserting categories:", catErr.message);
    return;
  }
  console.log(`  Inserted ${insertedCats.length} categories.`);

  // Build category name -> id map
  const { data: allCats } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  const catMap = new Map<string, string>();
  for (const cat of allCats || []) {
    catMap.set(cat.name, cat.id);
  }

  // 3. Insert SOPs
  console.log("\nInserting SOPs...");

  for (const sop of defaultSOPs) {
    const categoryId = catMap.get(sop.category);
    if (!categoryId) {
      console.error(`  Category not found for SOP "${sop.title}": ${sop.category}`);
      continue;
    }

    const { error: sopErr } = await supabase.from("sops").upsert(
      {
        slug: sop.id,
        title: sop.title,
        category_id: categoryId,
        description: sop.description,
        version: sop.version,
        tags: sop.tags,
        steps: sop.steps,
        last_updated: sop.lastUpdated,
      },
      { onConflict: "slug" }
    );

    if (sopErr) {
      console.error(`  Error inserting "${sop.title}":`, sopErr.message);
    } else {
      console.log(`  Inserted: ${sop.title}`);
    }
  }

  console.log("\nSeeding complete!");
  console.log("\nDemo credentials:");
  console.log("  Admin: admin@a3brands.com / admin123");
  console.log("  User:  dev@a3brands.com / dev123");
}

seed().catch(console.error);
