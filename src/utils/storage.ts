import { KeyMapping, Settings, MappingMode } from '../types/types';

interface StorageData {
  mappingModes: MappingMode[];
  currentModeId: string;
  settings: Settings;
}

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
  return {
    mappingModes: [],
    currentModeId: '',
    settings: {
      fontSize: 48,
      textColor: '#ffffff',
      backgroundColor: '#000000',
      promptFontSize: 16,
      lineSpacing: 1.5
    }
  };
}; 