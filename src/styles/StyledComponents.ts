import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import { TextConfig } from '../types/types';

export const GlobalStyle = createGlobalStyle`
  @media (forced-colors: active) {
    :root {
      forced-color-adjust: none;
    }
  }
`;

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translate(-50%, 5px);
  }
  to { 
    opacity: 1; 
    transform: translate(-50%, 0);
  }
`;

const textFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); }
  50% { box-shadow: 0 0 20px rgba(74, 144, 226, 0.8); }
  100% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); }
`;

const strongGlowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 59, 48, 0.7), inset 0 0 20px rgba(255, 59, 48, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 59, 48, 0.9), inset 0 0 40px rgba(255, 59, 48, 0.7); }
  100% { box-shadow: 0 0 10px rgba(255, 59, 48, 0.7), inset 0 0 20px rgba(255, 59, 48, 0.5); }
`;

export const AppContainer = styled.div<{ isWindowActive: boolean }>`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  
  ${props => !props.isWindowActive && css`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 3px solid rgba(255, 59, 48, 0.7);
      pointer-events: none;
      animation: ${strongGlowAnimation} 1.5s infinite;
      z-index: 1300;
    }
  `}
`;

export const TextDisplay = styled.div<{ config: TextConfig, isPreview?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 30, 40, 0.45);
  backdrop-filter: blur(32px) saturate(1.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${textFadeIn} 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform, opacity;
  z-index: 1100;

  .preview-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 2rem;
    letter-spacing: 2px;
    text-shadow: 0 2px 16px rgba(74,144,226,0.25);
  }

  & > div.text-content {
    max-width: 95%;         // 最大宽度为父容器的95%，防止内容太宽贴边
    max-height: 100vh;      // 最大高度为视口高度的95%，防止内容溢出屏幕
    overflow-y: auto;      // 超出高度时显示垂直滚动条，保证内容可滚动
    font-size: ${props => props.config.fontSize}px; // 字体大小由配置动态决定
    color: ${props => props.config.color};          // 字体颜色由配置动态决定
    line-height: ${props => props.config.lineHeight}; // 行高由配置动态决定
    text-align: left;       // 文本左对齐
    white-space: pre-wrap;  // 保留空白和换行，自动换行
    padding: 1rem;          // 内边距1rem，内容不贴边
    background: rgba(255, 255, 255, 0.08); // 半透明白色背景，提升可读性
    border-radius: 20px;    // 圆角20px，外观更柔和
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); // 阴影，提升浮层感
    transform-origin: center center; // 变换原点为中心，动画更自然
    will-change: transform; // 优化动画性能

    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 12px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(74, 144, 226, 0.3);
      border-radius: 6px;
      border: 3px solid transparent;
      background-clip: padding-box;
      
      &:hover {
        background: rgba(74, 144, 226, 0.5);
        transition: background 0.15s cubic-bezier(0.2, 0, 0, 1);
      }
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* 段落样式 */
    & p {
      margin: 0;
      text-indent: 2em;
      position: relative;
      padding: 0.5em 0;
      transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1);
      will-change: transform;
      
      &:hover {
        transform: translateX(5px);
      }
    }

    /* 分隔线样式 */
    & hr {
      border: none;
      border-top: 1px solid rgba(74, 144, 226, 0.2);
      margin: ${props => props.config.lineSpacing * 0.5}em 0;
    }
  }
`;

export const KeyMapOverlay = styled.div`
  position: relative;
  /* 居中交由外层 flex 容器控制 */
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 15px;
  width: 90%;
  max-width: 1000px;
  animation: ${fadeIn} 0.15s cubic-bezier(0.2, 0, 0, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(74, 144, 226, 0.2);
  will-change: transform, opacity;
  display: flex;
  gap: 2rem;
  z-index: 1200;
  transform-origin: center center;

  .numbers-section {
    flex: 2;
    display: flex;
    gap: 2rem;
    padding-right: 2rem;
    border-right: 1px solid rgba(74, 144, 226, 0.2);

    .number-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: stretch;
    }
  }

  .controls-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 200px;
    align-items: stretch;
  }

  h3 {
    color: #4a90e2;
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    opacity: 0.9;
    font-weight: 500;
  }
`;

export const KeyMapItem = styled.div<{ highlight?: boolean }>`
  padding: 0.6rem 0.8rem; // 按钮内边距，提升可点击区域
  background: ${props => props.highlight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(74, 144, 226, 0.1)'}; // 高亮时更亮的背景色
  border-radius: 8px; // 圆角 8px
  font-size: ${props => props.highlight ? '1.3rem' : '0.9rem'}; // 高亮时字体更大
  color: #ffffff; // 文字颜色白色
  transition: all 0.18s cubic-bezier(0.2, 0, 0, 1); // 平滑过渡动画
  border: 1.5px solid ${props => props.highlight ? '#4a90e2' : 'rgba(74, 144, 226, 0.2)'}; // 高亮时边框更明显
  display: flex; // 横向排列内容
  align-items: center; // 垂直居中
  gap: 0.5rem; // 子元素间距
  will-change: transform, background-color; // 优化动画性能
  transform: ${props => props.highlight ? 'scale(1.03)' : 'translateZ(0)'}; // 高亮时轻微放大
  font-weight: ${props => props.highlight ? 700 : 400}; // 高亮时加粗
  box-shadow: ${props => props.highlight ? '0 0 16px 2px rgba(74,144,226,0.18)' : 'none'}; // 高亮时有阴影
  flex: 1;

  &:hover {
    background: rgba(74, 144, 226, 0.2);
    transform: translateY(-1px) translateZ(0);
  }

  kbd {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 1.1em;
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 1.5em;
    text-align: center;
  }

  .title {
    flex: 1;
  }
`;

export const ConfigPanel = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(74, 144, 226, 0.2);
  backdrop-filter: blur(10px);
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PromptText = styled.div<{ isWarning?: boolean }>`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 1rem 2rem;
  background: ${props => props.isWarning ? 'rgba(255, 59, 48, 0.2)' : 'rgba(74, 144, 226, 0.2)'};
  color: ${props => props.isWarning ? '#ff3b30' : '#ffffff'};
  border-radius: 15px;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  z-index: 1200;
  box-shadow: ${props => props.isWarning 
    ? '0 4px 12px rgba(255, 59, 48, 0.3)' 
    : '0 4px 12px rgba(74, 144, 226, 0.3)'};
  border: 1px solid ${props => props.isWarning ? 'rgba(255, 59, 48, 0.3)' : 'rgba(74, 144, 226, 0.3)'};
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${fadeIn} 0.15s cubic-bezier(0.2, 0, 0, 1);
  will-change: transform, opacity;
  transform: translateZ(0);
  white-space: nowrap;
  
  ${props => props.isWarning ? css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${strongGlowAnimation} 2s infinite;
  ` : css`
    bottom: 1rem;
  `}

  kbd {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

export const Header = styled.header`
  padding: 1.5rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(74, 144, 226, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;

  h1 {
    color: #4a90e2;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 600;
    text-shadow: 0 0 20px rgba(74, 144, 226, 0.5);
    letter-spacing: 1px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 12px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(74, 144, 226, 0.3);
    border-radius: 6px;
    border: 3px solid transparent;
    background-clip: padding-box;
    
    &:hover {
      background: rgba(74, 144, 226, 0.5);
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`; 