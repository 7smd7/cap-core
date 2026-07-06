'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { SimulatedCheckout } from '@/components/SimulatedCheckout';

interface BookingWidgetProps {
  propertyName: string;
  price: number;
  propertyId: string;
}

export function BookingWidget({ propertyName, price, propertyId }: BookingWidgetProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <div className="sticky top-28 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50">
        <div className="flex items-baseline space-x-2 mb-6">
          <span className="text-4xl font-bold text-[#1A1A1A]">${price}</span>
          <span className="text-gray-500 font-medium">/ month</span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="font-medium text-gray-700">Move-in Date</span>
            <span className="font-bold text-[#1A1A1A]">Immediately</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="font-medium text-gray-700">Minimum Term</span>
            <span className="font-bold text-[#1A1A1A]">1 Month</span>
          </div>
        </div>

        <button 
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full py-4 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02]"
        >
          Initialize Subscription
        </button>

        <div className="mt-6 flex items-start space-x-3 text-sm text-gray-500">
          <Shield size={20} className="text-[#10B981] flex-shrink-0" />
          <p>
            No deposit required for NFI scores over 750. Billing managed autonomously via Stripe.
          </p>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SimulatedCheckout 
            propertyName={propertyName}
            price={price}
            propertyId={propertyId}
          />
        </div>
      )}
    </>
  );
}
