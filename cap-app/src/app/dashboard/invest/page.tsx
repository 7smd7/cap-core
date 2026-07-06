import { CreditCard, TrendingUp, DollarSign, Wallet, ArrowDownCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { stakeCapital, withdrawCapital } from "./actions";

export default async function CapInvestDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  const success = params?.success;
  const withdrawn = params?.withdrawn;
  const error = params?.error;

  // Fetch investments
  const { data: investment } = await supabase
    .from('cap_investments')
    .select('*')
    .eq('investor_id', user.id)
    .single();

  // Fetch active booking to get subscription cost
  const { data: booking } = await supabase
    .from('bookings')
    .select('monthly_rent, booking_type')
    .eq('resident_id', user.id)
    .eq('status', 'active')
    .single();

  const amountStaked = investment?.amount_staked_usd || 0;
  const yieldGenerated = investment?.yield_generated_usd || 0;

  // Simulated yield calculations (5% APY)
  const annualYield = amountStaked * 0.05;
  const monthlyYield = annualYield / 12;
  // Per 4-week cycle
  const cycleYield = (annualYield / 52) * 4;

  // Subscription coverage calculation
  const subscriptionCost = booking?.monthly_rent || 0;
  const coveragePercent = subscriptionCost > 0
    ? Math.min(100, (cycleYield / subscriptionCost) * 100)
    : 0;
  // How much capital needed for 100% coverage
  const capitalForFullCoverage = subscriptionCost > 0
    ? (subscriptionCost * 13) / 1  // 13 cycles/year at 5% APY: C * 0.05 = cost * 13 → C = cost*13/0.05*0.05... 
    // Correct: annual yield = C * 0.05; per 4-week = C*0.05/13; need that ≥ subscriptionCost
    // → C = subscriptionCost * 13 / 0.05 = subscriptionCost * 260
    : 0;
  const capitalForFullCoverageCorrect = subscriptionCost > 0
    ? Math.ceil((subscriptionCost * 13) / 0.05)
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">CAP Invest Wallet</h1>
        <p className="text-muted-foreground mt-1">Stake capital to offset your living expenses.</p>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#FF385C] text-white rounded-2xl p-6 shadow-lg border border-[#FF385C]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-white/80 text-sm font-medium mb-1">Total Staked Capital</h3>
            <div className="text-4xl font-black mb-4">${amountStaked.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1.5 rounded-lg w-fit">
              <TrendingUp className="w-4 h-4" /> 5.0% APY (Gov Bonds)
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-1">Yield Generated</h3>
          <div className="text-3xl font-bold mb-4 text-emerald-500">${yieldGenerated.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Automatically applied to your next 4-week rent deduction.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-1">4-Week Cycle Yield</h3>
          <div className="text-3xl font-bold mb-4">${cycleYield.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Add more capital to live rent-free.
          </p>
        </div>
      </div>

      {/* Subscription Coverage Card */}
      {subscriptionCost > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-5 h-5 text-[#FF385C]" />
            <h3 className="font-bold text-lg">Subscription Coverage</h3>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Your 4-week subscription costs</p>
              <p className="text-2xl font-black">${subscriptionCost.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm mb-1">Your yield covers</p>
              <p className={`text-2xl font-black ${coveragePercent >= 100 ? 'text-emerald-500' : coveragePercent >= 50 ? 'text-amber-500' : 'text-[#FF385C]'}`}>
                {coveragePercent.toFixed(1)}%
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all ${coveragePercent >= 100 ? 'bg-emerald-500' : coveragePercent >= 50 ? 'bg-amber-400' : 'bg-[#FF385C]'}`}
              style={{ width: `${Math.min(100, coveragePercent)}%` }}
            />
          </div>
          {coveragePercent < 100 ? (
            <p className="text-sm text-muted-foreground">
              Stake <span className="font-semibold text-foreground">${capitalForFullCoverageCorrect.toLocaleString()}</span> total to cover 100% of your subscription with yield alone.
            </p>
          ) : (
            <p className="text-sm text-emerald-600 font-semibold">
              🎉 Your yield fully covers your subscription. You are living rent-free.
            </p>
          )}
        </div>
      )}

      {/* Banners */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 text-sm font-medium">
          Capital staked successfully! Your yield has been boosted.
        </div>
      )}
      {withdrawn && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 text-sm font-medium">
          Withdrawal initiated. Funds will arrive in 3–5 business days.
        </div>
      )}

      {/* Forms Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stake Form */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Stake USD</h3>
              <p className="text-sm text-muted-foreground">Instantly boost your yield.</p>
            </div>
          </div>
          <form action={stakeCapital} className="space-y-4">
            <div>
              <label className="text-sm font-medium pl-1 mb-1 block">Amount (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="amount"
                  type="number"
                  required
                  min="100"
                  placeholder="10,000"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#FF385C]/50 transition-all text-lg font-medium"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-lg bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl">
              Stake Capital
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Capital is locked in low-risk treasury bonds.
            </p>
          </form>
        </div>

        {/* Withdraw Form */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <ArrowDownCircle className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Withdraw</h3>
              <p className="text-sm text-muted-foreground">3–5 business day processing.</p>
            </div>
          </div>
          <form action={withdrawCapital} className="space-y-4">
            <div>
              <label className="text-sm font-medium pl-1 mb-1 block">
                Amount (USD) — Balance: ${amountStaked.toLocaleString()}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="amount"
                  type="number"
                  required
                  min="1"
                  max={amountStaked}
                  placeholder="500"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#FF385C]/50 transition-all text-lg font-medium"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="outline"
              disabled={amountStaked === 0}
              className="w-full h-12 text-lg rounded-xl border-border hover:bg-secondary"
            >
              Request Withdrawal
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Withdrawals reduce your yield and subscription coverage.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
