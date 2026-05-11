import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import { useIDEStore } from '../store';
import { FileText, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const EditorWorkspace = () => {
  const { files, activeFileId, openFileIds, setActiveFile, closeFile, updateFileContent, theme } = useIDEStore();
  
  const activeFile = files.find(f => f.id === activeFileId);
  const openFiles = files.filter(f => openFileIds.includes(f.id));

  const handleEditorChange: OnChange = (value) => {
    if (activeFileId && value !== undefined) {
      updateFileContent(activeFileId, value);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-container-high overflow-hidden">
      {/* Tab Bar */}
      <div className="h-8 bg-surface-container-low flex items-center border-b border-outline-variant/10 shrink-0 overflow-x-auto no-scrollbar">
        {openFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 h-full border-t-2 transition-all cursor-pointer border-transparent shrink-0",
              activeFileId === file.id 
                ? "bg-surface-container-high border-primary text-primary" 
                : "text-outline hover:bg-surface-container hover:text-on-surface"
            )}
          >
            <FileText size={13} />
            <span className={cn("text-[11px] font-medium", file.isDirty && "italic font-bold")}>
              {file.name}
              {file.isDirty && '*'}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.id);
              }}
              className="ml-1 opacity-40 hover:opacity-100 p-0.5 hover:bg-surface-container rounded-sm transition-all"
            >
              <X size={11} />
            </button>
          </div>
        ))}
      </div>

      {/* Monaco Instance */}
      <div className="flex-1 overflow-hidden relative">
        {activeFile ? (
          <Editor
            height="100%"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            language={activeFile.language || 'typescript'}
            value={activeFile.content}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: '"JetBrains Mono", monospace',
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              padding: { top: 12 },
              backgroundColor: theme === 'dark' ? '#0b1326' : '#ffffff',
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-surface-container-lowest text-outline">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4 border border-outline-variant/10">
                <FileText size={32} className="opacity-20" />
              </div>
              <p className="text-sm font-medium tracking-wide">No file selected</p>
              <p className="text-[11px] uppercase tracking-widest opacity-50">Select a file from the explorer to begin coding</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
