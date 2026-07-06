import Link from 'next/link';
import { ArrowRight, Globe, Shield, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full bg-white text-[#1A1A1A] py-24 md:py-32 overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5A5F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={16} className="text-[#FF5A5F]" />
            <span className="text-sm font-medium text-gray-800">The Autonomous Organization for Living</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A1A1A] mb-8 leading-tight">
            Your physical life, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] to-orange-500">
              orchestrated by agents.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
            Project CAP replaces landlords and property managers with a swarm of specialized AI agents. 
            Experience the "ZeroDay" arrival: your apartment is stocked, your transport is booked, and your workspace is ready before you even land.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/listings"
              className="px-8 py-4 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center shadow-lg shadow-orange-500/20"
            >
              Explore CAP Properties
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link 
              href="#how-it-works"
              className="px-8 py-4 bg-white text-[#1A1A1A] border border-gray-200 hover:border-gray-300 rounded-full font-semibold text-lg transition-all"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-[#FF5A5F]">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fluid Mobility</h3>
            <p className="text-gray-600 leading-relaxed">
              Move seamlessly between network properties globally. Our FlowMobility agent handles your airport transfers and logistics automatically.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-[#10B981]">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Asset-Light Living</h3>
            <p className="text-gray-600 leading-relaxed">
              Stop buying furniture. Every CAP property is fully equipped for deep work, managed by our HousingCore agent.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-[#1A1A1A]">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">NourishNet Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Your dietary preferences travel with you. The NourishNet agent pre-stocks your fridge and coordinates local chef services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
