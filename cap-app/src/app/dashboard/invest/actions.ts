"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function stakeCapital(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Must be logged in.");

    const amountToAdd = parseFloat(formData.get("amount") as string);
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      throw new Error("Invalid amount");
    }

    const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
    if (!profile) {
      await supabase.from('profiles').insert({ id: user.id, email: user.email, nfi_score: 500, role: 'resident' });
    }

    const { data: investment } = await supabase
      .from('cap_investments')
      .select('*')
      .eq('investor_id', user.id)
      .single();

    if (investment) {
      const { error } = await supabase
        .from('cap_investments')
        .update({ amount_staked_usd: Number(investment.amount_staked_usd) + amountToAdd })
        .eq('investor_id', user.id);
      if (error) throw new Error("Update failed: " + error.message);
    } else {
      const { error } = await supabase
        .from('cap_investments')
        .insert({
          investor_id: user.id,
          amount_staked_usd: amountToAdd,
          yield_generated_usd: 0,
          status: 'staked'
        });
      if (error) throw new Error("Insert failed: " + error.message);
    }
  } catch (error: any) {
    console.error(error);
    return redirect("/dashboard/invest?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/dashboard/invest");
  redirect("/dashboard/invest?success=true");
}

export async function withdrawCapital(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Must be logged in.");

    const amountToWithdraw = parseFloat(formData.get("amount") as string);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      throw new Error("Invalid withdrawal amount");
    }

    const { data: investment } = await supabase
      .from('cap_investments')
      .select('*')
      .eq('investor_id', user.id)
      .single();

    if (!investment) throw new Error("No investment found.");

    const currentStaked = Number(investment.amount_staked_usd);
    if (amountToWithdraw > currentStaked) {
      throw new Error(`Cannot withdraw more than your staked balance ($${currentStaked.toLocaleString()}).`);
    }

    const newBalance = currentStaked - amountToWithdraw;
    const { error } = await supabase
      .from('cap_investments')
      .update({ amount_staked_usd: newBalance })
      .eq('investor_id', user.id);

    if (error) throw new Error("Withdrawal failed: " + error.message);

  } catch (error: any) {
    console.error(error);
    return redirect("/dashboard/invest?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/dashboard/invest");
  redirect("/dashboard/invest?withdrawn=true");
}
