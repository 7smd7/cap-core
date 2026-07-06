import { MapPin, Star, Wifi, Coffee, Sparkles, Lock, ThermometerSun, Monitor, Plane } from "lucide-react";
import { SimulatedCheckout } from "@/components/SimulatedCheckout";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Fix Next.js 15 breaking change: await params
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (!property) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
          <Sparkles className="w-3 h-3" />
          ZeroDay Experience Certified
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{property.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 font-bold text-foreground bg-secondary px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" /> 4.95
          </span>
          <span className="underline cursor-pointer hover:text-foreground transition-colors">124 verified reviews</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {property.city}, {property.country}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted border border-border">
          {property.photos && property.photos[0] ? (
            <img src={property.photos[0]} alt="Main" className="w-full h-full object-cover" />
          ) : (
            <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop" alt="Fallback" className="w-full h-full object-cover opacity-80" />
          )}
        </div>
        <div className="hidden md:block aspect-[4/3] rounded-3xl overflow-hidden bg-muted border border-border">
          {property.photos && property.photos[1] ? (
            <img src={property.photos[1]} alt="Secondary" className="w-full h-full object-cover" />
          ) : (
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Fallback" className="w-full h-full object-cover opacity-80" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-3xl font-bold mb-6">A New Paradigm of Living</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This residence is fully integrated into the CAP ecosystem. From the moment you arrive, 
              everything simply works. Your subscription covers rent, gigabit internet, automated climate control, 
              and your preferred groceries pre-stocked before arrival. No deposits, no utility bills, no friction.
            </p>
          </section>
          
          <section className="py-10 border-t border-border">
            <h3 className="text-2xl font-bold mb-8">The ZeroDay Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Smart Access</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Keyless entry via facial recognition. You are the key.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <ThermometerSun className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">PortableEnv</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Automated climate control perfectly synced to your cloud profile preferences.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Monitor className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">WorkOS</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Soundproof private workspace with an ergonomic chair and dual monitor setup.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF385C]/10 flex items-center justify-center shrink-0">
                  <Coffee className="w-6 h-6 text-[#FF385C]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">NourishNet</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Fridge pre-stocked with your exact dietary profile (e.g., vegan, Ethiopian coffee).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">CleanOS</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Unobtrusive weekly deep cleaning scheduled around your work hours.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">FlowMobility</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Seamless airport transfer waiting for you upon arrival in {property.city}.</p>
                </div>
              </div>

            </div>
          </section>

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <SimulatedCheckout 
              propertyId={property.id} 
              price={property.monthly_cost_usd} 
              propertyName={property.name} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
