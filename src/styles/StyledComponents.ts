import styled, { keyframes, css } from 'styled-components';
import { TextConfig } from '../types/types';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
      z-index: 1000;
    }
  `}
`;

export const TextDisplay = styled.div<{ config: TextConfig }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.config.backgroundColor || 'rgba(0, 0, 0, 0.95)'};
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
  
  & > div.text-content {
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    font-size: ${props => props.config.fontSize}px;
    color: ${props => props.config.color};
    line-height: ${props => props.config.lineHeight};
    text-align: left;
    white-space: pre-wrap;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

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
      transition: all 0.3s ease;
      
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  max-width: 80%;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(74, 144, 226, 0.2);
`;

export const KeyMapItem = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.2);
  
  &:hover {
    transform: translateX(5px);
    background: rgba(74, 144, 226, 0.15);
  }
  
  &:last-child {
    margin-bottom: 0;
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
  transform: translateX(-50%);
  padding: 1rem 2rem;
  background: ${props => props.isWarning ? 'rgba(255, 59, 48, 0.2)' : 'rgba(74, 144, 226, 0.2)'};
  color: ${props => props.isWarning ? '#ff3b30' : '#ffffff'};
  border-radius: 15px;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.isWarning ? 'rgba(255, 59, 48, 0.3)' : 'rgba(74, 144, 226, 0.3)'};
  
  ${props => props.isWarning ? css`
    top: 1rem;
    animation: ${glowAnimation} 2s infinite;
  ` : css`
    bottom: 1rem;
  `}
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