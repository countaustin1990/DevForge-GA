import React, { useState } from 'react';
import { useIDEStore } from '../store';
import { ChevronDown, ChevronRight, Folder, FileText, MoreHorizontal, FlaskConical } from 'lucide-react';
import { cn } from '../lib/utils';
import { WorkspaceFile } from '../types';

export const Explorer = () => {
  const { files, openFile, activeFileId } = useIDEStore();
  const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);

  const toggleFolder = (id: string) => {
    setCollapsedFolders(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const renderFileTree = (parentId: string | null = null, depth = 0) => {
    const children = files.filter(f => f.parentId === parentId);
    
    return children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    }).map(file => {
      const isCollapsed = collapsedFolders.includes(file.id);
      const isActive = activeFileId === file.id;

      if (file.type === 'folder') {
        return (
          <div key={file.id}>
            <div 
              onClick={() => toggleFolder(file.id)}
              className="flex items-center gap-1.5 px-3 py-0.5 text-on-surface-variant hover:bg-surface-container-high cursor-pointer group transition-colors"
              style={{ paddingLeft: `${depth * 10 + 12}px` }}
            >
              {isCollapsed ? <ChevronRight size={13} className="text-outline" /> : <ChevronDown size={13} className="text-outline" />}
              <Folder size={14} className={cn("text-outline transition-colors", !isCollapsed && "text-primary/70")} />
              <span className="text-xs font-medium leading-none">{file.name}</span>
            </div>
            {!isCollapsed && renderFileTree(file.id, depth + 1)}
          </div>
        );
      }

      return (
        <div 
          key={file.id}
          onClick={() => openFile(file.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-0.5 cursor-pointer transition-all",
            isActive ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
          )}
          style={{ paddingLeft: `${depth * 10 + 16}px` }}
        >
          <FileText size={14} className={cn(isActive ? "text-primary" : "text-outline")} />
          <span className="text-xs leading-none">{file.name}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low border-r border-outline-variant/10 shrink-0">
      <div className="h-8 flex items-center justify-between px-3 border-b border-outline-variant/5 bg-surface-container shrink-0">
        <span className="text-[9px] uppercase font-black tracking-widest text-outline">Project Alpha</span>
        <div className="flex gap-1">
          <MoreHorizontal size={13} className="text-outline cursor-pointer hover:text-on-surface" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-1 no-scrollbar">
        {renderFileTree(null)}
      </div>

      {/* Optional: Navigation Scaffolding */}
      <div className="p-2 border-t border-outline-variant/5 text-[9px] uppercase font-black text-outline/30 select-none text-center">
        Virtual Root
      </div>
    </div>
  );
};
