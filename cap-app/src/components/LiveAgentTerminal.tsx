'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const SYSTEM_LOGS = [
  { time: '08:00', text: 'HousingCore: Daily diagnostics pass. HVAC optimal.' },
  { time: '09:15', text: 'NourishNet: User skipped breakfast. Adjusting tomorrow\'s prep.' },
  { time: '11:30', text: 'CleanOS: Scheduling deep clean during calendar gap (14:00).' },
  { time: '12:45', text: 'Concierge: Detected low coffee supply. Auto-dispatching restock.' },
  { time: '14:00', text: 'CleanOS: Cleaning crew arrived via temporary access key.' },
  { time: '15:10', text: 'CleanOS: Crew departed. Access revoked. Env reset to baseline.' },
];

export function LiveAgentTerminal() {
  const [logs, setLogs] = useState<typeof SYSTEM_LOGS>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= SYSTEM_LOGS.length) {
      // Loop logs for presentation
      const timer = setTimeout(() => {
        setLogs([]);
        setIndex(0);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLogs(prev => [...prev, SYSTEM_LOGS[index]]);
      setIndex(prev => prev + 1);
    }, Math.random() * 2000 + 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center text-gray-400 text-xs font-mono">
          <Terminal size={14} className="mr-2" />
          <span>global-swarm-controller</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold font-mono">Agents Active</span>
        </div>
      </div>
      <div className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-2">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-3"
            >
              <span className="text-gray-500">[{log.time}]</span>
              <span className="text-gray-300">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-white mt-1 inline-block"
        />
      </div>
    </div>
  );
}
