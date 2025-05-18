import { useRef, useCallback, useEffect } from 'react';

interface ScrollState {
  isScrolling: boolean;
  direction: 'up' | 'down' | null;
  animationFrameId: number | null;
}

export const useScrollControl = (stepSize: number) => {
  const scrollState = useRef<ScrollState>({
    isScrolling: false,
    direction: null,
    animationFrameId: null
  });

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const performScroll = useCallback(() => {
    if (!scrollState.current.isScrolling || !scrollContainer.current) return;

    const direction = scrollState.current.direction;
    const container = scrollContainer.current;
    const scrollAmount = stepSize * (direction === 'up' ? -1 : 1);
    
    container.scrollTop += scrollAmount;
    
    // 继续下一帧动画
    scrollState.current.animationFrameId = requestAnimationFrame(performScroll);
  }, [stepSize]);

  const startScroll = useCallback((direction: 'up' | 'down') => {
    scrollState.current.isScrolling = true;
    scrollState.current.direction = direction;
    
    if (!scrollState.current.animationFrameId) {
      scrollState.current.animationFrameId = requestAnimationFrame(performScroll);
    }
  }, [performScroll]);

  const stopScroll = useCallback(() => {
    scrollState.current.isScrolling = false;
    scrollState.current.direction = null;
    
    if (scrollState.current.animationFrameId) {
      cancelAnimationFrame(scrollState.current.animationFrameId);
      scrollState.current.animationFrameId = null;
    }
  }, []);

  // 清理动画
  useEffect(() => {
    return () => {
      stopScroll(); // 先停止滚动
      if (scrollState.current.animationFrameId) {
        cancelAnimationFrame(scrollState.current.animationFrameId);
      }
    };
  }, [stopScroll]); // 添加 stopScroll 到依赖数组

  return {
    setScrollContainer: useCallback((element: HTMLDivElement | null) => {
      scrollContainer.current = element;
    }, []),
    startScroll,
    stopScroll
  };
}; 