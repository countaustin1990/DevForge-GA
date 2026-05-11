import { create } from 'zustand';
import { WorkspaceFile, Diagnostic, AISuggestion } from './types';

interface IDEState {
  files: WorkspaceFile[];
  activeFileId: string | null;
  openFileIds: string[];
  diagnostics: Diagnostic[];
  suggestions: AISuggestion[];
  isScanning: boolean;
  theme: 'dark' | 'light';

  // Actions
  setFiles: (files: WorkspaceFile[]) => void;
  setActiveFile: (id: string | null) => void;
  openFile: (id: string) => void;
  closeFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setIsScanning: (scanning: boolean) => void;
  addDiagnostic: (diagnostic: Diagnostic) => void;
  clearDiagnostics: () => void;
}

const initialFiles: WorkspaceFile[] = [
  {
    id: 'root-src',
    name: 'src',
    path: '/src',
    type: 'folder',
    parentId: null,
  },
  {
    id: 'components-folder',
    name: 'components',
    path: '/src/components',
    type: 'folder',
    parentId: 'root-src',
  },
  {
    id: 'sandbox-page',
    name: 'SandboxPage.tsx',
    path: '/src/SandboxPage.tsx',
    type: 'file',
    language: 'typescript',
    parentId: 'root-src',
    content: `import { useDevForgeRealtime } from '@devforge/core';
import { useEffect, useState } from 'react';

export const SandboxPage = () => {
  const { data, status, scan } = useDevForgeRealtime({
    id: 'sandbox-alpha',
    monitoring: true,
    refreshRate: 100
  });

  // Initialize real-time synchronization with Sandbox
  useEffect(() => {
    scan();
  }, [scan]);

  return (
    <div className="container">
      {status === 'active' ? <LiveViewer /> : <Loader />}
    </div>
  );
};`,
  },
  {
    id: 'app-css',
    name: 'App.css',
    path: '/src/App.css',
    type: 'file',
    language: 'css',
    parentId: 'root-src',
    content: '.container {\n  padding: 2rem;\n}',
  },
  {
    id: 'package-json',
    name: 'package.json',
    path: '/package.json',
    type: 'file',
    language: 'json',
    parentId: null,
    content: '{\n  "name": "devforge-app",\n  "version": "1.0.0"\n}',
  },
];

export const useIDEStore = create<IDEState>((set) => ({
  files: initialFiles,
  activeFileId: 'sandbox-page',
  openFileIds: ['sandbox-page'],
  diagnostics: [],
  suggestions: [
    {
      id: 'sugg-1',
      fileId: 'sandbox-page',
      title: 'Hook Optimization',
      description: 'Wrap scan() in useCallback to prevent re-renders.',
      impact: 'High',
      code: 'const scan = useCallback(() => { ... }, []);',
    },
    {
      id: 'sugg-2',
      fileId: 'sandbox-page',
      title: 'Typing Perfected',
      description: 'Schema validation matches RealtimeHookOptions interface.',
      impact: 'Low',
    }
  ],
  isScanning: true,
  theme: 'dark',

  setFiles: (files) => set({ files }),
  setActiveFile: (id) => set({ activeFileId: id }),
  openFile: (id) => set((state) => ({
    openFileIds: state.openFileIds.includes(id) ? state.openFileIds : [...state.openFileIds, id],
    activeFileId: id
  })),
  closeFile: (id) => set((state) => {
    const newOpenFiles = state.openFileIds.filter(fid => fid !== id);
    return {
      openFileIds: newOpenFiles,
      activeFileId: state.activeFileId === id ? (newOpenFiles[newOpenFiles.length - 1] || null) : state.activeFileId
    };
  }),
  updateFileContent: (id, content) => set((state) => ({
    files: state.files.map(f => f.id === id ? { ...f, content, isDirty: true } : f)
  })),
  setTheme: (theme) => set({ theme }),
  setIsScanning: (isScanning) => set({ isScanning }),
  addDiagnostic: (diagnostic) => set((state) => ({
    diagnostics: [...state.diagnostics, diagnostic]
  })),
  clearDiagnostics: () => set({ diagnostics: [] }),
}));
