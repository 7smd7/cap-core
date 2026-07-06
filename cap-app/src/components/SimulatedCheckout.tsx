"use client";

"use client"
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, CreditCard, CalendarDays, Clock, RefreshCw, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/explore/[id]/actions";

export function SimulatedCheckout({ 
  propertyId, 
  price, 
  propertyName 
}: { 
  propertyId: string, 
  price: number, 
  propertyName: string 
}) {
  const [step, setStep] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingType, setBookingType] = useState<"anchor" | "nomad_pass">("anchor");
  const [durationWeeks, setDurationWeeks] = useState<number>(1);
  const router = useRouter();

  // Generate upcoming Mondays (including today if it's Monday)
  const upcomingMondays = useMemo(() => {
    const mondays = [];
    let d = new Date();
    // If today is Monday, start from today; otherwise, find next Monday
    if (d.getDay() !== 1) {
      d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
    }
    for (let i = 0; i < 4; i++) {
      mondays.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    return mondays;
  }, []);

  // Compute last Monday for reference (non-selectable)
  const lastMonday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Move back to previous Monday
    return d;
  }, []);

  const [moveInDate, setMoveInDate] = useState<string>(upcomingMondays[0].toISOString().split("T")[0]);

  // Calculate pricing
  // Base price is for 4 weeks (28 days)
  const baseWeeklyRate = price / 4;
  
  let finalPrice = price;
  if (bookingType === "nomad_pass") {
    let premium = 1.0;
    if (durationWeeks === 1) premium = 1.30;
    if (durationWeeks === 2) premium = 1.20;
    if (durationWeeks === 3) premium = 1.10;
    
    finalPrice = Math.round((baseWeeklyRate * premium) * durationWeeks);
  }

  const handleCheckout = async () => {
    setStep("processing");
    try {
      await createBooking(propertyId, finalPrice, moveInDate, bookingType, durationWeeks);
      setStep("success");
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
      setStep("error");
    }
  };

  if (step === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Subscription Activated!</h3>
        <p className="text-green-700">
          Your booking for {propertyName} is confirmed. Redirecting to your CAP dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-6">Confirm Subscription</h3>
      
      {step === "error" && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4 mb-6">
        
        {/* Booking Type Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-secondary/50 p-1 rounded-xl">
          <button
            onClick={() => setBookingType("anchor")}
            className={`flex flex-col items-center justify-center gap-0.5 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
              bookingType === "anchor" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Anchor</span>
            <span className="text-xs font-normal">(4-Week)</span>
          </button>
          <button
            onClick={() => setBookingType("nomad_pass")}
            className={`flex flex-col items-center justify-center gap-0.5 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
              bookingType === "nomad_pass" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Plane className="w-4 h-4" /> Nomad Pass</span>
            <span className="text-xs font-normal">(1-3 weeks)</span>
          </button>
        </div>

        {/* Date Selection */}
        <div className="flex flex-col gap-3 pb-4 border-b border-border">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Move-in Date (Mondays Only)</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select 
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                {upcomingMondays.map(date => (
                  <option key={date.toISOString()} value={date.toISOString().split("T")[0]}>
                    {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Show coverage period for Anchor subscription */}
          {bookingType === "anchor" && (
            <div className="text-sm text-muted-foreground mt-2">
              Your 4‑Week Anchor Subscription covers the period from {lastMonday.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} to {upcomingMondays[0].toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}.
            </div>
          )}

          {bookingType === "nomad_pass" && (
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select 
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(Number(e.target.value))}
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                >
                  <option value={1}>1 Week (+30% Premium)</option>
                  <option value={2}>2 Weeks (+20% Premium)</option>
                  <option value={3}>3 Weeks (+10% Premium)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="text-muted-foreground">
            {bookingType === "anchor" ? "Base 4-Week Rent" : `Short-Term Housing (${durationWeeks} weeks)`}
          </div>
          <div className="font-semibold">${finalPrice}</div>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="text-muted-foreground">CleanOS</div>
          <div className="font-semibold text-[#FF385C]">Included</div>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="text-muted-foreground">FlowMobility</div>
          <div className="font-semibold text-[#FF385C]">Included</div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-lg font-bold">{bookingType === "anchor" ? "Total 4-Week Subscription" : "Total Due"}</div>
          <div className="text-2xl font-bold">${finalPrice}</div>
        </div>
      </div>

      <div className="bg-secondary rounded-xl p-4 mb-6 flex items-start gap-3">
        <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
        <div>
          <div className="font-semibold text-sm">Simulated Payment</div>
          <div className="text-xs text-muted-foreground">No real card required for MVP</div>
        </div>
      </div>

      <Button 
        onClick={handleCheckout} 
        disabled={step === "processing"}
        className="w-full h-12 text-lg bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl"
      >
        {step === "processing" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Subscribe & Book"
        )}
      </Button>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        By subscribing, you agree to the CAP Coordination Terms.
      </p>
    </div>
  );
}
