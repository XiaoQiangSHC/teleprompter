export interface TextConfig {
  content: string;
  title: string;
  fontSize: number;
  color: string;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  lineSpacing: number;
  backgroundColor?: string;
}

export interface KeyMapping {
  [key: string]: TextConfig;
}

export interface MappingMode {
  id: string;
  name: string;
  description: string;
  keyMappings: KeyMapping;
}

export interface ScrollConfig {
  speed: number;
  stepSize: number;
}

export interface Settings {
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  promptFontSize: number;
  lineSpacing: number;
  previewScale?: number;
}

export interface AppState {
  isFullscreen: boolean;
  isWindowActive: boolean;
  currentText: TextConfig | null;
  mappingModes: MappingMode[];
  currentModeId: string;
  scrollConfig: ScrollConfig;
  showKeyMap: boolean;
  settings: Settings;
  showPrompt: boolean;
  currentKey: string | null;
  previewScale?: number;
} 