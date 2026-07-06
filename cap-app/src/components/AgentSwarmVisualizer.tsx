'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Zap, CheckCircle2 } from 'lucide-react';

type Log = {
  id: string;
  agent: string;
  action: string;
  status: 'pending' | 'success';
  time: number;
};

const AGENTS = [
  { name: 'HousingCore', color: 'text-blue-400' },
  { name: 'FlowMobility', color: 'text-purple-400' },
  { name: 'NourishNet', color: 'text-orange-400' },
  { name: 'Concierge', color: 'text-pink-400' },
];

const ACTIONS = [
  { agent: 'HousingCore', text: 'Securing lease for property #YEV-402...' },
  { agent: 'HousingCore', text: 'Verifying smart lock integration...' },
  { agent: 'FlowMobility', text: 'Dispatching airport transfer for 14:30...' },
  { agent: 'NourishNet', text: 'Stocking fridge based on dietary prefs...' },
  { agent: 'Concierge', text: 'Zero Day Experience activated. Welcome home.' },
];

export function AgentSwarmVisualizer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= ACTIONS.length) return;

    const action = ACTIONS[currentIndex];
    const logId = Math.random().toString(36).substring(7);
    
    const newLog: Log = {
      id: logId,
      agent: action.agent,
      action: action.text,
      status: 'pending',
      time: Date.now(),
    };
    
    setLogs((prev) => [...prev, newLog]);

    const timer = setTimeout(() => {
      setLogs((prev) => 
        prev.map(l => l.id === logId ? { ...l, status: 'success' } : l)
      );
      
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1000 + Math.random() * 1500);
      
    }, 1500 + Math.random() * 2000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-mono text-sm">
      <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <Terminal size={14} className="mr-2" />
          <span>cap-swarm-orchestrator</span>
        </div>
      </div>
      
      <div className="p-5 h-[300px] overflow-y-auto space-y-3">
        <AnimatePresence>
          {logs.map((log) => {
            const agentInfo = AGENTS.find(a => a.name === log.agent);
            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-xs">[{new Date(log.time).toLocaleTimeString()}]</span>
                  <span className={`font-semibold ${agentInfo?.color}`}>@{log.agent}</span>
                </div>
                <div className="flex items-start pl-4 space-x-3">
                  <span className="text-gray-300 mt-0.5">&gt;</span>
                  <span className="text-gray-300 flex-1">{log.action}</span>
                  {log.status === 'pending' ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="text-gray-500"
                    >
                      <Cpu size={16} />
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="text-[#10B981]"
                    >
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {currentIndex >= ACTIONS.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center pt-4 text-[#10B981] font-bold"
          >
            <Zap size={16} className="mr-2" />
            <span>All systems nominal. Awaiting user arrival.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
