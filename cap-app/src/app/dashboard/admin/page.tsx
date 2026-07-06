import { Users, Building, CalendarCheck, TrendingUp, AlertTriangle, DollarSign, Plus, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/auth");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  // Hard guard — admins only
  if (profile?.role !== "admin") return redirect("/dashboard");

  // ── Metrics ──────────────────────────────────────────────
  const [
    { count: usersCount },
    { count: propertiesCount },
    { data: bookings },
    { data: investments },
    { data: pendingUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*, properties(name, city, country), profiles(full_name, email)")
      .order("created_at", { ascending: false }),
    supabase.from("cap_investments").select("amount_staked_usd, yield_generated_usd"),
    supabase
      .from("profiles")
      .select("id, email, full_name, created_at, role")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalStaked = investments?.reduce((acc, i) => acc + Number(i.amount_staked_usd), 0) ?? 0;
  const totalYield = investments?.reduce((acc, i) => acc + Number(i.yield_generated_usd), 0) ?? 0;
  const activeBookings = bookings?.filter((b) => b.status === "active") ?? [];
  const pendingCancellations = bookings?.filter((b) => b.status === "pending_cancellation") ?? [];
  const mrr = activeBookings.reduce((acc, b) => acc + Number(b.monthly_rent), 0);
  const occupancyRate = propertiesCount
    ? Math.round((activeBookings.length / propertiesCount) * 100)
    : 0;

  const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-emerald-100 text-emerald-700" },
    pending_cancellation: { label: "Cancelling", className: "bg-amber-100 text-amber-700" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600" },
    nomad_pass: { label: "Nomad Pass", className: "bg-purple-100 text-purple-700" },
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">CAP Central Command</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {profile?.full_name || user.email}. Platform overview.
          </p>
        </div>
        <Link href="/dashboard/admin/properties">
          <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white gap-2">
            <Plus className="w-4 h-4" /> Add Property
          </Button>
        </Link>
      </div>

      {/* Alert if any cancellations pending */}
      {pendingCancellations.length > 0 && (
        <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            {pendingCancellations.length} subscription{pendingCancellations.length > 1 ? "s" : ""} pending cancellation — rooms will free up in ~4 weeks.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">{usersCount ?? 0}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Citizens</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold">{propertiesCount ?? 0}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Nodes Online</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3">
            <CalendarCheck className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">{activeBookings.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Active Subscriptions</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold">{pendingCancellations.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Pending Exit</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3">
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">${mrr.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-0.5">4-Week MRR</div>
        </div>

        <div className="bg-[#FF385C] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-black">${totalStaked.toLocaleString()}</div>
            <div className="text-xs text-white/80 mt-0.5">Capital Staked</div>
          </div>
        </div>
      </div>

      {/* Occupancy bar */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Network Occupancy</h3>
          <span className="text-2xl font-black">{occupancyRate}%</span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${occupancyRate >= 80 ? "bg-emerald-500" : occupancyRate >= 50 ? "bg-amber-400" : "bg-[#FF385C]"}`}
            style={{ width: `${occupancyRate}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {activeBookings.length} of {propertiesCount ?? 0} nodes occupied · Yield pool: ${totalYield.toLocaleString()} distributed
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bookings Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-bold">All Subscriptions</h3>
            <span className="text-sm text-muted-foreground">{bookings?.length ?? 0} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-medium">Resident</th>
                  <th className="p-4 font-medium">Property</th>
                  <th className="p-4 font-medium">Move-in</th>
                  <th className="p-4 font-medium">Rent</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {bookings?.map((booking) => {
                  const statusKey = booking.status as string;
                  const badge = statusConfig[statusKey] ?? { label: statusKey, className: "bg-gray-100 text-gray-600" };
                  return (
                    <tr key={booking.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold">{booking.profiles?.full_name || "—"}</div>
                        <div className="text-xs text-muted-foreground">{booking.profiles?.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{booking.properties?.name || "—"}</div>
                        <div className="text-xs text-muted-foreground">{booking.properties?.city}, {booking.properties?.country}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{new Date(booking.move_in_date).toLocaleDateString()}</td>
                      <td className="p-4 font-semibold">${booking.monthly_rent}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${booking.booking_type === "nomad_pass" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                          {booking.booking_type === "nomad_pass" ? "Nomad" : "Anchor"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {(!bookings || bookings.length === 0) && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">No bookings yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users + Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/admin/properties" className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF385C]/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-[#FF385C]" />
                  </div>
                  <span className="text-sm font-medium">Add Property</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/explore" className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium">View All Listings</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/dashboard/invest" className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">CAP Invest</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Sign-ups */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex-1">
            <h3 className="text-lg font-bold mb-4">Recent Sign-ups</h3>
            <div className="flex flex-col gap-3">
              {pendingUsers?.map((u) => {
                const name = u.full_name || u.email || "Unknown";
                const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
                return (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{u.full_name || "—"}</div>
                      <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                    </div>
                    {u.role === "admin" && (
                      <span className="ml-auto text-[10px] font-bold bg-[#FF385C]/10 text-[#FF385C] px-1.5 py-0.5 rounded shrink-0">ADMIN</span>
                    )}
                  </div>
                );
              })}
              {(!pendingUsers || pendingUsers.length === 0) && (
                <p className="text-sm text-muted-foreground">No users yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
