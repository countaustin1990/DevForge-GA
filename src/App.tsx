import React, { useState, useEffect } from 'react';
import { useIDEStore } from './store';
import { TopBar, Sidebar } from './components/Navigation';
import { Explorer } from './components/Explorer';
import { EditorWorkspace } from './components/EditorWorkspace';
import { AIPanel } from './components/AIPanel';
import { StatusBar } from './components/StatusBar';
import { Radar } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type View = 'code' | 'explorer' | 'scan';

export default function App() {
  const { theme } = useIDEStore();
  const [activeView, setActiveView] = useState<View>('code');

  // Enforce theme class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface text-on-surface">
      {/* Search / Header */}
      <TopBar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar icon rail */}
        <Sidebar />

        {/* Main Workspace Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Mobile Segmented View Control */}
          <div className="md:hidden flex p-2 bg-surface-container-low border-b border-outline-variant/10 shrink-0 z-20">
            <div className="flex-1 flex bg-surface-container-lowest rounded-xl p-1 shadow-inner">
              {(['code', 'explorer', 'scan'] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveView(v)}
                  className={cn(
                    "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                    activeView === v 
                      ? "bg-primary text-on-primary-container shadow-lg" 
                      : "text-outline hover:text-on-surface-variant"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Left Panel: Explorer */}
          <div className={cn(
            "w-52 shrink-0 transition-all duration-300",
            activeView !== 'explorer' && "hidden md:block"
          )}>
            <Explorer />
          </div>

          {/* Center Panel: Editor */}
          <div className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-300",
            activeView !== 'code' && "hidden md:flex"
          )}>
            <EditorWorkspace />
          </div>

          {/* Right Panel: AI Panel */}
          <div className={cn(
            "w-72 shrink-0 transition-all duration-300",
            activeView !== 'scan' && "hidden md:block"
          )}>
            <AIPanel />
          </div>
        </div>
      </div>

      {/* Terminal / Status Bar */}
      <StatusBar />

      {/* Mobile AI FAB */}
      <div className="md:hidden fixed bottom-12 right-6 z-[60]">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveView('scan')}
          className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-full shadow-2xl flex items-center justify-center text-on-primary-container transition-transform ring-4 ring-surface"
        >
          <Radar size={32} className="opacity-90" />
        </motion.button>
      </div>

      {/* Command Palette Backdrop Scaffold */}
      <AnimatePresence>
        {/* Placeholder for future Command Palette (Ctrl+K) */}
      </AnimatePresence>
    </div>
  );
}
