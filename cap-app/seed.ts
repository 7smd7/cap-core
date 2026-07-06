import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const properties = [
  {
    name: "The Artisan Loft",
    city: "Yerevan",
    country: "Armenia",
    address: "Cascade Area",
    monthly_cost_usd: 1200,
    status: "available",
    verified: true,
    amenities: ["wifi", "cleaning"],
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1e525044c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Minimalist Studio Oasis",
    city: "Tbilisi",
    country: "Georgia",
    address: "Vake District",
    monthly_cost_usd: 950,
    status: "available",
    verified: true,
    amenities: ["wifi", "cleaning"],
    photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]
  },
  {
    name: "Panoramic Skyline Apartment",
    city: "Dubai",
    country: "UAE",
    address: "Downtown",
    monthly_cost_usd: 2400,
    status: "available",
    verified: true,
    amenities: ["wifi", "cleaning"],
    photos: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]
  },
  {
    name: "Historic Center Flat",
    city: "Lisbon",
    country: "Portugal",
    address: "Alfama",
    monthly_cost_usd: 1800,
    status: "available",
    verified: true,
    amenities: ["wifi", "cleaning"],
    photos: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]
  }
];

async function seed() {
  console.log("Seeding properties...");
  
  // check if any exist
  const { data } = await supabase.from("properties").select("id").limit(1);
  if (data && data.length > 0) {
    console.log("Properties already exist, skipping seed.");
    return;
  }

  for (const p of properties) {
    const { error } = await supabase.from("properties").insert(p);
    if (error) console.error("Error inserting:", error);
    else console.log("Inserted", p.name);
  }
  
  console.log("Done.");
}

seed();
