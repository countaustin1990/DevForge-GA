import React from 'react';
import { 
  Folder, Search, GitBranch, FlaskConical, Settings, 
  HelpCircle, User, Zap, Play, Sun, Moon, MoreHorizontal 
} from 'lucide-react';
import { useIDEStore } from '../store';
import { cn } from '../lib/utils';

export const TopBar = () => {
  const { theme, setTheme } = useIDEStore();

  return (
    <header className="h-9 flex items-center justify-between px-3 bg-surface border-b border-outline-variant/20 z-50 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-container rounded flex items-center justify-center shadow-lg relative group overflow-hidden">
            <Zap size={14} className="text-on-primary-container fill-current relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <span className="text-base font-black tracking-tighter bg-gradient-to-r from-on-surface to-primary bg-clip-text text-transparent select-none">DevForge</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-0.5">
          {['Explorer', 'Source', 'Debug', 'Extensions'].map((item) => (
            <button 
              key={item}
              className={cn(
                "text-[9px] uppercase tracking-widest font-black px-3 py-1 transition-all rounded-md",
                item === 'Explorer' ? "text-primary bg-primary/5" : "text-outline hover:text-on-surface hover:bg-surface-container"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Placeholder */}
        <div className="hidden lg:flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant/10 text-outline min-w-[240px] cursor-text hover:bg-surface-container transition-colors">
          <Search size={12} />
          <span className="text-[10px] font-medium grow">Search context or files...</span>
          <span className="text-[8px] bg-surface-container-highest px-1 py-0.5 rounded border border-outline-variant/20 font-black">⌘K</span>
        </div>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded-full hover:bg-surface-container-high text-outline transition-all active:scale-95"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        
        <button className="hidden sm:flex items-center gap-1.5 bg-primary text-on-primary-container px-3 py-1 rounded-md font-black text-[9px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95">
          <Play size={10} fill="currentColor" />
          Deploy
        </button>

        <div className="w-6 h-6 rounded-full border border-outline-variant/30 overflow-hidden bg-surface-container-highest cursor-pointer hover:border-primary/50 transition-all">
          <img 
            src="https://picsum.photos/seed/devforge/64/64" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-12 flex flex-col items-center py-2 bg-surface-container-low border-r border-outline-variant/10 shrink-0">
      <NavItem icon={Folder} label="Files" active />
      <NavItem icon={Search} label="Search" />
      <NavItem icon={GitBranch} label="Git" />
      <NavItem icon={FlaskConical} label="Scanner" />
      <NavItem icon={Settings} label="Settings" />
      
      <div className="mt-auto w-full flex flex-col items-center gap-2">
        <div className="w-6 h-[1px] bg-outline-variant/20" />
        <NavItem icon={User} label="User" />
      </div>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <button className={cn(
    "w-full py-3 flex flex-col items-center gap-0.5 group relative transition-colors",
    active ? "text-primary" : "text-outline hover:text-on-surface"
  )}>
    {active && <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(173,198,255,0.4)]" />}
    <Icon size={20} className={cn("transition-transform group-active:scale-90", active && "scale-105")} />
    <span className="text-[8px] uppercase font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
  </button>
);
