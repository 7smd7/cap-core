"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function cancelSubscription(bookingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Must be logged in.");

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("resident_id", user.id)
    .single();

  if (!booking) throw new Error("Booking not found");

  const { error } = await supabase
    .from("bookings")
    .update({ status: "pending_cancellation" })
    .eq("id", bookingId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function reactivateSubscription(bookingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Must be logged in.");

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("resident_id", user.id)
    .single();

  if (!booking) throw new Error("Booking not found");

  const { error } = await supabase
    .from("bookings")
    .update({ status: "active" })
    .eq("id", bookingId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
