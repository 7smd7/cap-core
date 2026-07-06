import { Clock, MapPin, Key, Coffee } from 'lucide-react';

const TIMELINE_EVENTS = [
  { time: '14:30', title: 'FlowMobility Dispatch', desc: 'S-Class en route to EVN Airport.', icon: <MapPin size={16} />, active: false, past: true },
  { time: '15:15', title: 'ZeroDay Activation', desc: 'Door access granted to your face ID.', icon: <Key size={16} />, active: true, past: false },
  { time: '15:30', title: 'Environment Configured', desc: 'HVAC set to 22°C. Lighting at 70%.', icon: <Clock size={16} />, active: false, past: false },
  { time: '18:00', title: 'NourishNet Dinner', desc: 'Private chef delivery: Post-flight recovery meal.', icon: <Coffee size={16} />, active: false, past: false },
];

export function ZeroDayTimeline() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">ZeroDay Execution Plan</h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            {/* Timeline dot */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
              event.active ? 'bg-[#FF5A5F] text-white animate-pulse' : 
              event.past ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {event.icon}
            </div>
            
            {/* Card */}
            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${
              event.active ? 'border-[#FF5A5F] bg-orange-50/50' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-bold ${event.active ? 'text-[#1A1A1A]' : 'text-gray-600'}`}>{event.title}</h4>
                <span className={`text-xs font-mono font-medium ${event.active ? 'text-[#FF5A5F]' : 'text-gray-400'}`}>{event.time}</span>
              </div>
              <p className="text-sm text-gray-500">{event.desc}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
