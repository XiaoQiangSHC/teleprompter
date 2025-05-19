import React, { useState, useCallback, useEffect } from 'react';
import { useKeyboardControl } from './hooks/useKeyboardControl';
import { useWindowFocus } from './hooks/useWindowFocus';
import QuickEdit from './components/QuickEdit';
import Settings from './components/Settings';
import MappingModeManager from './components/MappingModeManager';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import {
  AppContainer,
  TextDisplay,
  KeyMapOverlay,
  KeyMapItem,
  Button,
  PromptText,
  Header,
  MainContent,
  GlobalStyle
} from './styles/StyledComponents';
import { TextConfig, KeyMapping, ScrollConfig, AppState, MappingMode } from './types/types';
import styled from 'styled-components';

const defaultKeyMappings: KeyMapping = {
  '0': {
    content: '结束语\n感谢观看',
    title: '结束语',
    fontSize: 48,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '1': {
    content: '开场白示例\n这是一个多行文本\n可以显示多行内容',
    title: '开场白',
    fontSize: 48,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '2': {
    content: '第二段文本\n用于演示多个文本切换',
    title: '第二段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 2,
    textAlign: 'left',
    lineSpacing: 1.5
  },
  '3': {
    content: '第三段内容',
    title: '第三段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '4': {
    content: '第四段内容',
    title: '第四段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '5': {
    content: '第五段内容',
    title: '第五段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '6': {
    content: '第六段内容',
    title: '第六段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '7': {
    content: '第七段内容',
    title: '第七段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '8': {
    content: '第八段内容',
    title: '第八段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  },
  '9': {
    content: '第九段内容',
    title: '第九段',
    fontSize: 42,
    color: '#ffffff',
    lineHeight: 1.8,
    textAlign: 'center',
    lineSpacing: 1.5
  }
};

const defaultMode: MappingMode = {
  id: 'default',
  name: '默认模式',
  description: '默认的映射配置',
  keyMappings: defaultKeyMappings
};

const defaultScrollConfig: ScrollConfig = {
  speed: 1,
  stepSize: 5
};

const getInitialState = (): AppState => {
  const savedData = loadFromLocalStorage();
  const initialModes = savedData.mappingModes || [defaultMode];
  const initialModeId = savedData.currentModeId || defaultMode.id;

  return {
    isFullscreen: false,
    isWindowActive: true,
    currentText: null,
    mappingModes: initialModes,
    currentModeId: initialModeId,
    scrollConfig: defaultScrollConfig,
    showKeyMap: false,
    showPrompt: false,
    settings: savedData.settings || {
      fontSize: 48,
      textColor: '#ffffff',
      backgroundColor: '#000000',
      promptFontSize: 16,
      lineSpacing: 1.5
    },
    currentKey: null
  };
};

const KeyMapOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  pointer-events: none;
`;

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(getInitialState());
  const isWindowActive = useWindowFocus();

  const getCurrentMode = useCallback(() => {
    return state.mappingModes.find(mode => mode.id === state.currentModeId) || state.mappingModes[0];
  }, [state.mappingModes, state.currentModeId]);

  useEffect(() => {
    saveToLocalStorage({
      mappingModes: state.mappingModes,
      currentModeId: state.currentModeId,
      settings: state.settings
    });
  }, [state.mappingModes, state.currentModeId, state.settings]);

  useEffect(() => {
    if (!state.isFullscreen && state.currentKey) {
      setState(prev => ({ ...prev, showPrompt: true }));
    } else {
      setState(prev => ({ ...prev, showPrompt: false }));
    }
  }, [state.isFullscreen, state.currentKey]);

  const handleTextSelect = useCallback((key: string, text: TextConfig) => {
    setState(prev => ({
      ...prev,
      isFullscreen: true,
      showKeyMap: false,
      showPrompt: true,
      currentText: {
        ...text,
        fontSize: state.settings.fontSize,
        color: state.settings.textColor,
        lineSpacing: state.settings.lineSpacing,
        backgroundColor: state.settings.backgroundColor
      },
      currentKey: key
    }));
  }, [state.settings]);

  const handleExit = useCallback(() => {
    setState(prev => ({
      ...prev,
      isFullscreen: false,
      currentText: null,
      currentKey: null,
      showPrompt: false,
      showKeyMap: false
    }));
  }, []);

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    const container = document.querySelector('.text-content');
    if (container) {
      const scrollAmount = state.scrollConfig.stepSize * (direction === 'up' ? 1 : -1);
      const targetScroll = container.scrollTop + scrollAmount;
      
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [state.scrollConfig.stepSize]);

  const toggleKeyMap = useCallback(() => {
    setState(prev => ({
      ...prev,
      showKeyMap: !prev.showKeyMap
    }));
  }, []);

  const handleModeSelect = useCallback((modeId: string) => {
    setState(prev => ({
      ...prev,
      currentModeId: modeId
    }));
  }, []);

  const handleModeAdd = useCallback((mode: MappingMode) => {
    setState(prev => ({
      ...prev,
      mappingModes: [...prev.mappingModes, mode],
      currentModeId: mode.id
    }));
  }, []);

  const handleModeUpdate = useCallback((mode: MappingMode) => {
    setState(prev => ({
      ...prev,
      mappingModes: prev.mappingModes.map(m => 
        m.id === mode.id ? mode : m
      )
    }));
  }, []);

  const handleModeDelete = useCallback((modeId: string) => {
    setState(prev => {
      const newModes = prev.mappingModes.filter(m => m.id !== modeId);
      return {
        ...prev,
        mappingModes: newModes,
        currentModeId: newModes[0].id
      };
    });
  }, []);

  const handleConfigUpdate = useCallback((key: string, config: TextConfig) => {
    setState(prev => {
      const currentMode = prev.mappingModes.find(m => m.id === prev.currentModeId)!;
      const updatedMode = {
        ...currentMode,
        keyMappings: {
          ...currentMode.keyMappings,
          [key]: config
        }
      };

      return {
        ...prev,
        mappingModes: prev.mappingModes.map(m =>
          m.id === prev.currentModeId ? updatedMode : m
        )
      };
    });
  }, []);

  const handleSettingsChange = useCallback((newSettings: {
    fontSize: number;
    textColor: string;
    backgroundColor: string;
    promptFontSize: number;
    lineSpacing: number;
    previewScale?: number;
  }) => {
    setState(prev => {
      // 更新所有文案的行距设置
      const currentMode = prev.mappingModes.find(m => m.id === prev.currentModeId)!;
      const updatedMode = {
        ...currentMode,
        keyMappings: Object.fromEntries(
          Object.entries(currentMode.keyMappings).map(([key, mapping]) => [
            key,
            { ...mapping, lineSpacing: newSettings.lineSpacing }
          ])
        )
      };

      return {
        ...prev,
        settings: {
          ...prev.settings,
          ...newSettings
        },
        mappingModes: prev.mappingModes.map(m =>
          m.id === prev.currentModeId ? updatedMode : m
        )
      };
    });
  }, []);

  const formatContent = (content: string) => {
    const paragraphs = content.split('\n').filter(para => para.trim() !== '');
    return paragraphs
      .map(para => `<p>${para}</p>`)
      .join('<hr/>');
  };

  const { setScrollContainer } = useKeyboardControl({
    onTextSelect: handleTextSelect,
    onExit: handleExit,
    onToggleKeyMap: toggleKeyMap,
    keyMappings: getCurrentMode().keyMappings,
    isFullscreen: state.isFullscreen,
    scrollStepSize: state.scrollConfig.stepSize
  });

  const currentMode = getCurrentMode();

  return (
    <>
      <GlobalStyle />
      <AppContainer isWindowActive={isWindowActive}>
        {!state.isFullscreen && (
          <Header>
            <h1>智能提词器</h1>
          </Header>
        )}

        <MainContent>
          {state.isFullscreen && state.currentText && (
            <TextDisplay 
              config={{
                ...state.currentText,
                fontSize: state.settings.fontSize
              }}
            >
              <div 
                className="text-content"
                ref={setScrollContainer}
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(state.currentText.content)
                }}
              />
            </TextDisplay>
          )}

          {!isWindowActive && (
            <PromptText isWarning>
              窗口未激活 - 请点击窗口以激活提词器
            </PromptText>
          )}

          {state.showKeyMap && (
            <KeyMapOverlayWrapper>
              <KeyMapOverlay
                style={{
                  transform: `scale(${state.settings.previewScale || 1})`,
                  transition: 'transform 0.2s cubic-bezier(0.22,0.61,0.36,1)',
                  pointerEvents: 'auto'
                }}
              >
                <div className="numbers-section">
                  <div className="number-column">
                    <h3>数字键 0-4</h3>
                    {Object.entries(currentMode.keyMappings)
                      .filter(([key]) => ['0', '1', '2', '3', '4'].includes(key))
                      .sort((a, b) => {
                        const order = ['0', '1', '2', '3', '4'];
                        return order.indexOf(a[0]) - order.indexOf(b[0]);
                      })
                      .map(([key, config]) => (
                        <KeyMapItem key={key} highlight={key === state.currentKey}>
                          <kbd>{key}</kbd>
                          <span className="title">{config.title}</span>
                        </KeyMapItem>
                      ))}
                  </div>
                  <div className="number-column">
                    <h3>数字键 5-9</h3>
                    {Object.entries(currentMode.keyMappings)
                      .filter(([key]) => ['5', '6', '7', '8', '9'].includes(key))
                      .map(([key, config]) => (
                        <KeyMapItem key={key} highlight={key === state.currentKey}>
                          <kbd>{key}</kbd>
                          <span className="title">{config.title}</span>
                        </KeyMapItem>
                      ))}
                  </div>
                </div>

                <div className="controls-section">
                  <h3>控制按键</h3>
                  <KeyMapItem>
                    <kbd>Enter</kbd>
                    <span className="title">再次按下取消预览</span>
                  </KeyMapItem>
                  <KeyMapItem>
                    <kbd>+</kbd>
                    <span className="title">向下滚动</span>
                  </KeyMapItem>
                  <KeyMapItem>
                    <kbd>-</kbd>
                    <span className="title">向上滚动</span>
                  </KeyMapItem>
                  <KeyMapItem>
                    <kbd>ESC</kbd>
                    <span className="title">返回主页面</span>
                  </KeyMapItem>
                </div>
              </KeyMapOverlay>
            </KeyMapOverlayWrapper>
          )}

          {state.showPrompt && state.currentKey && !state.isFullscreen && (
            <PromptText style={{ top: '2rem', right: '2rem', left: 'auto', transform: 'none', position: 'fixed', background: 'rgba(74,144,226,0.18)', fontSize: '1rem', zIndex: 1300 }}>
              <span style={{ fontWeight: 600 }}>{currentMode.keyMappings[state.currentKey]?.title || ''}</span>
            </PromptText>
          )}

          {!state.isFullscreen && (
            <>
              <Settings
                defaultFontSize={state.settings.fontSize}
                defaultTextColor={state.settings.textColor}
                defaultBackgroundColor={state.settings.backgroundColor}
                defaultPromptFontSize={state.settings.promptFontSize}
                defaultLineSpacing={state.settings.lineSpacing}
                defaultPreviewScale={state.settings.previewScale || 1}
                onSettingsChange={handleSettingsChange}
              />
              <MappingModeManager
                modes={state.mappingModes}
                currentModeId={state.currentModeId}
                onModeSelect={handleModeSelect}
                onModeAdd={handleModeAdd}
                onModeUpdate={handleModeUpdate}
                onModeDelete={handleModeDelete}
                currentMappings={currentMode.keyMappings}
              />
              <QuickEdit
                keyMappings={currentMode.keyMappings}
                onUpdate={handleConfigUpdate}
              />
            </>
          )}
        </MainContent>
      </AppContainer>
    </>
  );
};

export default App; 