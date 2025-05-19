import { KeyMapping, Settings, MappingMode } from '../types/types';

interface StorageData {
  mappingModes: MappingMode[];
  currentModeId: string;
  settings: Settings;
}

const createDefaultTextConfig = (key: string) => ({
  content: '点击编辑文本内容',
  title: `文本 ${key}`,
  fontSize: 48,
  color: '#ffffff',
  lineHeight: 1.5,
  textAlign: 'center' as const,
  lineSpacing: 1.5,
  backgroundColor: '#000000'
});

const DEFAULT_MAPPING_MODE: MappingMode = {
  id: 'default',
  name: '默认模式',
  description: '默认键盘映射模式',
  keyMappings: {
    '0': createDefaultTextConfig('0'),
    '1': {
      content: '欢迎使用智能提词器\n\n使用小键盘数字键（0-9）快速切换文本\n空格键：暂停/继续\n上下方向键：调整滚动速度\nESC：退出全屏\nF11：进入全屏',
      title: '欢迎',
      fontSize: 48,
      color: '#ffffff',
      lineHeight: 1.5,
      textAlign: 'center',
      lineSpacing: 1.5,
      backgroundColor: '#000000'
    },
    '2': createDefaultTextConfig('2'),
    '3': createDefaultTextConfig('3'),
    '4': createDefaultTextConfig('4'),
    '5': createDefaultTextConfig('5'),
    '6': createDefaultTextConfig('6'),
    '7': createDefaultTextConfig('7'),
    '8': createDefaultTextConfig('8'),
    '9': createDefaultTextConfig('9')
  }
};

export const saveToLocalStorage = (data: StorageData) => {
  try {
    localStorage.setItem('prompterData', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): StorageData => {
  try {
    const data = localStorage.getItem('prompterData');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
  
  // 返回默认状态
  return {
    mappingModes: [DEFAULT_MAPPING_MODE],
    currentModeId: DEFAULT_MAPPING_MODE.id,
    settings: {
      fontSize: 48,
      textColor: '#ffffff',
      backgroundColor: '#000000',
      promptFontSize: 16,
      lineSpacing: 1.5
    }
  };
}; 