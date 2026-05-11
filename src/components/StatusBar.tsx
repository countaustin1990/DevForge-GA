import React from 'react';
import { Radar, GitBranch, Keyboard, Terminal, AlertCircle } from 'lucide-react';
import { useIDEStore } from '../store';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const StatusBar = () => {
  const { isScanning } = useIDEStore();

  return (
    <footer className="h-6 flex items-center justify-between px-2 bg-surface-container-highest border-t border-outline-variant/10 z-50 shrink-0 select-none">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-2 px-3 bg-primary/10 text-primary h-full cursor-pointer hover:bg-primary/20 transition-colors group">
          <motion.div
            animate={isScanning ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Radar size={12} />
          </motion.div>
          <span className="text-[10px] font-mono font-black uppercase tracking-tighter">
            AI: {isScanning ? 'Monitoring' : 'Idle'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-2 text-outline hover:text-on-surface cursor-pointer h-full transition-colors">
          <GitBranch size={12} />
          <span className="text-[10px] font-mono font-bold">main*</span>
        </div>

        {/* Diagnostic indicator */}
        <div className="flex items-center gap-1 px-2 text-outline hover:text-secondary cursor-pointer h-full transition-colors border-x border-outline-variant/5">
          <AlertCircle size={10} />
          <span className="text-[10px] font-mono font-bold">0</span>
        </div>
      </div>

      <div className="flex items-center gap-4 h-full pr-2">
        <div className="flex items-center gap-1.5 h-full px-2 border-l border-outline-variant/5">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.8)]" />
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">online</span>
        </div>

        <div className="flex items-center gap-2 text-outline h-full px-2">
          <span className="text-[10px] font-mono">UTF-8</span>
          <Keyboard size={12} />
        </div>
      </div>
    </footer>
  );
};
