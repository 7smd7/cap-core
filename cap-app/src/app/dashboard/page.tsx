import { Home, MapPin, Zap, Shield, Coffee, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NomadDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // Fetch user data
  const { data: userData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch active booking
  const { data: activeBooking } = await supabase
    .from('bookings')
    .select(`
      *,
      properties (*)
    `)
    .eq('resident_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const property = activeBooking?.properties;

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData?.full_name || 'Nomad'}</h1>
          <p className="text-muted-foreground mt-1">
            {property ? `Your CAP subscription is active in ${property.city}.` : "You don't have any active subscriptions."}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-full border border-border">
          <div className="w-8 h-8 rounded-full bg-[#FF385C]/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#FF385C]" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">NFI Score</div>
            <div className="text-sm font-bold text-foreground">{userData?.nfi_score || 50} / 100</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Active Booking Card */}
        <div className="md:col-span-2 bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col md:flex-row">
          {property ? (
            <>
              <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-muted">
                {property.photos && property.photos[0] ? (
                  <img 
                    src={property.photos[0]} 
                    alt="Current home"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop" 
                    alt="Current home"
                    className="w-full h-full object-cover opacity-80"
                  />
                )}
                <div className="absolute top-3 left-3 bg-[#FF385C] text-white text-xs font-bold px-2 py-1 rounded-md uppercase">
                  {activeBooking.booking_type === 'nomad_pass' 
                    ? 'Nomad Pass' 
                    : activeBooking.status === 'pending_cancellation' 
                      ? 'Cancellation Pending' 
                      : 'Anchor Subscription'}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{property.name}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" /> {property.city}, {property.country}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Move-in Date</div>
                      <div className="font-semibold text-sm">
                        {new Date(activeBooking.move_in_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Total Due</div>
                      <div className="font-semibold text-sm">
                        ${activeBooking.monthly_rent}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {activeBooking.booking_type === 'nomad_pass' ? (
                     <div className="text-sm font-medium text-amber-600 bg-amber-50 p-2 rounded-lg text-center border border-amber-200">
                        Check-out: {new Date(activeBooking.end_date).toLocaleDateString()}
                     </div>
                  ) : activeBooking.status === 'active' ? (
                    <form action={async () => {
                      "use server";
                      const { cancelSubscription } = await import('./actions');
                      await cancelSubscription(activeBooking.id);
                    }}>
                      <Button type="submit" size="sm" variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                        Cancel Subscription (4 Weeks Notice)
                      </Button>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium text-amber-600 bg-amber-50 p-2 rounded-lg text-center border border-amber-200">
                        Moving out in ~4 weeks
                      </div>
                      <form action={async () => {
                        "use server";
                        const { reactivateSubscription } = await import('./actions');
                        await reactivateSubscription(activeBooking.id);
                      }}>
                        <Button type="submit" size="sm" variant="outline" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 font-semibold">
                          🌱 Stay Rooted
                        </Button>
                      </form>
                    </div>
                  )}
                  <Button size="sm" className="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white">Smart Lock</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 flex flex-col items-center justify-center w-full text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Active Homes</h3>
              <p className="text-muted-foreground mb-6">Explore verified homes to start your subscription.</p>
              <Link href="/explore">
                <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white">Explore Homes</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Service Quick Actions */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-4">Active Services</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">CleanOS</span>
                </div>
                <span className="text-xs text-muted-foreground">{property ? 'Every Friday' : '-'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium">NourishNet</span>
                </div>
                <span className="text-xs text-muted-foreground">{property ? 'Vegan Profile' : '-'}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-6 justify-between text-sm text-[#FF385C] hover:text-[#E31C5F] hover:bg-[#FF385C]/5">
            Manage Preferences <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Network Activity Log */}
      <div>
        <h3 className="text-xl font-bold mb-6">Recent Coordination</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {property ? (
            <div className="divide-y divide-border">
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Weekly cleaning scheduled</p>
                  <p className="text-xs text-muted-foreground mt-1">Vendor: Sparkle Team • For Friday</p>
                </div>
              </div>
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Subscription payment successful</p>
                  <p className="text-xs text-muted-foreground mt-1">Stripe • Just now</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No recent coordination activity.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
