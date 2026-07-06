import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Key, Shield, Zap, Home, Briefcase, CreditCard, Car, Heart, ShieldCheck, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero.png" alt="Premium CAP Coliving Apartment" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#FF385C] text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF385C] animate-pulse"></span>
            CAP (Capital as Passport)
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1] mb-6">
            You don't own anything. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] to-orange-400">You coordinate everything.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            <strong>Capital as Passport</strong> (CAP) is the first Housing-as-a-Service platform. A single subscription for premium housing, cleaning, and nourishment. Move freely, live effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore">
              <Button size="lg" className="h-14 px-8 text-lg bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-full">
                Explore Homes <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#manifesto">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                Read the Manifesto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Manifesto Section */}
      <section id="manifesto" className="py-32 bg-foreground text-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-background/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 md:sticky md:top-24">
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#FF385C] uppercase mb-4">The Manifesto</h2>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
                A paradigm shift in <br className="hidden md:block" />
                <span className="text-gray-400">global living.</span>
              </h3>
            </div>
            
            <div className="md:col-span-8 md:pl-12">
              <div className="space-y-12 text-xl md:text-2xl font-light leading-relaxed text-gray-300 max-w-3xl">
                <p>
                  <strong className="text-white font-medium">This is not a glorified hostel.</strong> In a traditional coliving space, you might get a cheap breakfast and a shared desk, but you sacrifice privacy for a "communal" lifestyle.
                </p>
                <p>
                  Our vision is different. We want professionals to experience absolute privacy, individuality, and luxury for the exact same cost. 
                </p>
                <p>
                  We eliminate repetitive, mundane tasks—cleaning, logistics, grocery shopping—so your freed-up time goes entirely to deep work, exploration, and rest.
                </p>
                
                <div className="pt-8 mt-8 border-t border-gray-800">
                  <p className="text-3xl md:text-4xl font-medium leading-tight text-white">
                    "Humans should not be anchored to a single coordinate. They should flow seamlessly through the world at peak personal comfort."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The ZeroDay Experience */}
      <section id="zeroday" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF385C]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 w-full order-2 lg:order-1 relative min-h-[500px]">
              {/* Expansive Glassmorphism Layout */}
              
              {/* Card 1 */}
              <div className="absolute top-0 left-0 w-[85%] sm:w-3/4 z-10 bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 transform hover:-translate-y-2 transition-all duration-500 hover:bg-card/60">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <Key className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground mb-1">11:30 PM • Digital Key</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">Arriving at Yerevan Airport. The door unlocks with your phone.</div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute top-36 right-0 w-[85%] sm:w-3/4 z-20 bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 transform hover:-translate-y-2 transition-all duration-500 hover:bg-card/60">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-orange-500/20 shadow-inner">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground mb-1">12:00 AM • Climate Ready</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">Temperature automatically set to your preferred 22°C.</div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute top-72 left-8 w-[85%] sm:w-3/4 z-30 bg-card/60 backdrop-blur-3xl border border-[#FF385C]/30 rounded-3xl shadow-[0_0_50px_-12px_rgba(255,56,92,0.3)] p-6 transform hover:-translate-y-2 transition-all duration-500 hover:bg-card/80">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#FF385C]/20 rounded-2xl flex items-center justify-center shrink-0 border border-[#FF385C]/30 shadow-inner">
                    <Heart className="w-6 h-6 text-[#FF385C]" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground mb-1">12:45 AM • Fridge Stocked</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">Your diet travels with you. Oat milk & Ethiopian coffee waiting.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-xs rounded-full uppercase tracking-wider mb-2">
                The Holy Grail Feature
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                The <span className="text-[#FF385C]">ZeroDay</span> Experience
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Land in a new city at midnight. The car is waiting. The door unlocks with your phone. The temperature is exactly how you like it. Your favorite coffee is in the fridge.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You never feel like you've moved. You just seamlessly continue living. The friction of relocation has been completely engineered out of existence.
              </p>
              <div className="pt-6">
                <Link href="/explore">
                  <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                    Experience it yourself
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The CAP Ecosystem */}
      <section id="ecosystem" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The CAP Ecosystem</h2>
            <p className="text-lg text-muted-foreground">A truly decentralized living platform requires a network of interwoven services. These are the core nodes of our network.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HousingCore */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-[#FF385C]/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">HousingCore</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium, standardized private apartments. No shared dorms. Absolute privacy guaranteed across every property in our network.
              </p>
            </div>

            {/* TrustLedger */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">TrustLedger (NFI)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your Nomad Financial Identity. Timely payments build your credit score, unlocking deposit-free rentals and premium perks.
              </p>
            </div>

            {/* CAP Invest */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-[#FF385C]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#FF385C]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6 text-[#FF385C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">CAP Invest</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yield-Backed Housing. Stake capital into government bonds; the yield pays your monthly subscription. Live entirely for free.
              </p>
            </div>

            {/* WorkOS */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-[#FF385C]/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">WorkOS</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                On-demand access to soundproof private offices and professional facilities. For 100% focus, not just sitting in a crowded cafe.
              </p>
            </div>

            {/* NourishNet */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-[#FF385C]/50 transition-colors group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">NourishNet</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your dietary profile (e.g., high-protein, vegan) travels with you. Local chefs automatically prep and deliver meals to your new door.
              </p>
            </div>

            {/* FlowMobility */}
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-[#FF385C]/50 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">FlowMobility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Zero friction transit. Airport transfers and welcome kits are automatically dispatched when you land in a new ecosystem node.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
