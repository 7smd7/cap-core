import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: properties } = await supabase.from('properties').select('*');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">Explore Verified Homes</h1>
          <p className="text-lg text-muted-foreground">Every home includes cleaning, fast WiFi, and a stocked fridge.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="rounded-full">Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {properties?.map((property) => (
          <Link href={`/explore/${property.id}`} key={property.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-muted">
              {property.photos && property.photos.length > 0 ? (
                <img 
                  src={property.photos[0]} 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop" 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 fill-current" />
                4.95
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {property.city}, {property.country}
                </p>
              </div>
              <div className="text-right">
                <span className="font-semibold block">${property.monthly_cost_usd}</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
