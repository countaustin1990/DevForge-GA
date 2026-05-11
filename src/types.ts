export type FileType = 'file' | 'folder';

export interface WorkspaceFile {
  id: string;
  name: string;
  path: string;
  type: FileType;
  language?: string;
  content?: string;
  isDirty?: boolean;
  parentId?: string | null;
}

export type DiagnosticSeverity = 'error' | 'warning' | 'info' | 'hint';

export interface Diagnostic {
  id: string;
  fileId: string;
  line: number;
  message: string;
  severity: DiagnosticSeverity;
  source: string;
}

export interface AISuggestion {
  id: string;
  fileId: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  code?: string;
  lineRange?: [number, number];
}

export interface Workspace {
  id: string;
  name: string;
  files: WorkspaceFile[];
  activeFileId: string | null;
  openFileIds: string[];
  diagnostics: Diagnostic[];
  suggestions: AISuggestion[];
}
