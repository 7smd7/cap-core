"use server";

import { createClient } from "@/lib/supabase/server";

export async function createBooking(propertyId: string, rentAmount: number, moveInDate: string, bookingType: 'anchor' | 'nomad_pass' = 'anchor', durationWeeks?: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to book a property.");
  }

  let endDate = null;
  if (bookingType === 'nomad_pass' && durationWeeks) {
    const start = new Date(moveInDate);
    start.setDate(start.getDate() + (durationWeeks * 7));
    endDate = start.toISOString().split("T")[0];
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      resident_id: user.id,
      property_id: propertyId,
      move_in_date: moveInDate,
      status: "active",
      monthly_rent: rentAmount,
      booking_type: bookingType,
      end_date: endDate
    })
    .select()
    .single();

  if (error) {
    console.error("Booking error:", error);
    throw new Error(error.message);
  }

  return data;
}
