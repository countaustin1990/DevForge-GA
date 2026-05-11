import React from 'react';
import { useIDEStore } from '../store';
import { Radar, Zap, CheckCircle2, AlertTriangle, RefreshCw, LayoutDashboard, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const AIPanel = () => {
  const { suggestions, isScanning, activeFileId, files } = useIDEStore();
  const activeFile = files.find(f => f.id === activeFileId);

  return (
    <div className="flex flex-col h-full bg-surface-container-low border-l border-outline-variant/10 shrink-0">
      <div className="h-8 flex items-center justify-between px-3 border-b border-outline-variant/5 bg-surface-container shrink-0">
        <span className="text-[9px] uppercase font-black tracking-widest text-outline">DevForge AI Panel</span>
        <div className="flex items-center gap-2 text-outline">
          <RefreshCw size={13} className="cursor-pointer hover:text-on-surface hover:rotate-180 transition-transform duration-500" />
          <LayoutDashboard size={13} className="cursor-pointer hover:text-on-surface" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
        {/* Scanner Status Card */}
        <div className="bg-surface-container-high rounded-xl p-3 border-l-4 border-secondary relative overflow-hidden group shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-xs font-bold tracking-tight">Real-time Scanner</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.6)]" 
                />
                <span className="text-[9px] font-black uppercase tracking-widest text-secondary">
                  {isScanning ? 'Scanning...' : 'Idle'}
                </span>
              </div>
            </div>
            <Radar size={18} className="text-secondary opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Analyzing <span className="text-primary font-mono">{activeFile?.name || 'Workspace'}</span> for logic leaks and performance gaps.
          </p>
        </div>

        {/* Diagnostic Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 bg-surface-container-highest p-3 rounded-xl flex items-center gap-3 border border-outline-variant/10 shadow-sm transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-full border-4 border-secondary/20 flex items-center justify-center bg-secondary/5 relative">
              <span className="text-base font-black text-secondary">94</span>
              <div className="absolute inset-0 rounded-full border-t-4 border-secondary animate-spin-slow opacity-20" />
            </div>
            <div>
              <div className="text-[9px] text-outline uppercase font-black tracking-widest">Dev Score</div>
              <div className="text-[11px] font-bold">Healthy Structure.</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/10 flex flex-col justify-between h-16">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-tertiary" />
              <span className="text-[8px] font-black text-outline uppercase tracking-wider">Issues</span>
            </div>
            <div className="text-xl font-black font-mono leading-none">02</div>
          </div>
          <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/10 flex flex-col justify-between h-16">
            <div className="flex items-center gap-1.5">
              <Zap size={13} className="text-primary" />
              <span className="text-[8px] font-black text-outline uppercase tracking-wider">Tips</span>
            </div>
            <div className="text-xl font-black font-mono leading-none">{suggestions.length}</div>
          </div>
        </div>

        {/* Insights & Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] uppercase font-black text-outline tracking-wider">Live Insights</span>
            <span className="text-[8px] text-outline/40 italic">Context aware</span>
          </div>

          <div className="space-y-2">
            {suggestions.map((s) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 bg-surface-container-lowest rounded-xl border border-primary/10 hover:border-primary/40 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Zap size={13} className="text-primary" />
                    <span className="text-[11px] font-black text-primary uppercase tracking-tight">{s.title}</span>
                  </div>
                  <span className={cn(
                    "text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest border",
                    s.impact === 'High' ? "bg-primary/10 border-primary/20 text-primary" : "bg-outline/10 border-outline/20 text-outline"
                  )}>
                    {s.impact}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mb-2.5">
                  {s.description}
                </p>
                {s.code && (
                  <div className="bg-surface-container p-2 rounded-lg mb-2.5 font-mono text-[10px] text-primary/80 border border-primary/5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {s.code}
                  </div>
                )}
                <div className="flex gap-1.5">
                  <button className="flex-1 text-[8px] bg-primary text-on-primary-container px-2 py-1 rounded-lg font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                    Apply Fix
                  </button>
                  <button className="px-2 py-1 text-[8px] text-outline font-black uppercase tracking-widest hover:text-on-surface transition-colors">
                    Dismiss
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Metric Visualization */}
        <div className="pt-4 border-t border-outline-variant/10">
          <span className="text-[9px] uppercase font-black text-outline tracking-widest mb-3 block">Engine Latency</span>
          <div className="flex items-end gap-1 h-12 px-1">
            {[45, 65, 85, 55, 35, 75, 95, 50, 40, 60].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className={cn(
                  "flex-1 rounded-t-sm transition-colors duration-500",
                  i === 6 ? "bg-secondary" : "bg-primary/20 hover:bg-primary/40"
                )} 
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="text-[8px] text-outline uppercase font-black tracking-widest">Processing</span>
            <span className="text-[8px] text-secondary font-black tracking-widest">12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
