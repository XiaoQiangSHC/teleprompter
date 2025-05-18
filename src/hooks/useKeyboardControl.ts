import { useEffect, useCallback } from 'react';
import { TextConfig, KeyMapping } from '../types/types';
import { useScrollControl } from './useScrollControl';

interface UseKeyboardControlProps {
  onTextSelect: (text: TextConfig) => void;
  onExit: () => void;
  onToggleKeyMap: () => void;
  keyMappings: KeyMapping;
  isFullscreen: boolean;
  scrollStepSize: number;
}

export const useKeyboardControl = ({
  onTextSelect,
  onExit,
  onToggleKeyMap,
  keyMappings,
  isFullscreen,
  scrollStepSize
}: UseKeyboardControlProps) => {
  const { setScrollContainer, startScroll, stopScroll } = useScrollControl(scrollStepSize);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Handle numpad keys (0-9)
    if (event.code.startsWith('Numpad') && !event.code.includes('Enter')) {
      const key = event.code.replace('Numpad', '');
      if (key === 'Add') {
        startScroll('down');
      } else if (key === 'Subtract') {
        startScroll('up');
      } else if (keyMappings[key]) {
        onTextSelect(keyMappings[key]);
      }
    }

    // Handle ESC key
    if (event.code === 'Escape' && isFullscreen) {
      onExit();
    }

    // Handle keymap toggle
    if (event.code === 'NumpadEnter') {
      if (isFullscreen) {
        onToggleKeyMap();
      }
    }
  }, [keyMappings, isFullscreen, onTextSelect, onExit, onToggleKeyMap, startScroll]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.code === 'NumpadAdd' || event.code === 'NumpadSubtract') {
      stopScroll();
    }
  }, [stopScroll]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    setScrollContainer
  };
}; 