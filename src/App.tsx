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
  MainContent
} from './styles/StyledComponents';
import { TextConfig, KeyMapping, ScrollConfig, AppState, MappingMode } from './types/types';

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
    }
  };
};

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
    let timer: NodeJS.Timeout;
    if (state.isFullscreen && state.currentText) {
      setState(prev => ({ ...prev, showPrompt: true }));
      timer = setTimeout(() => {
        setState(prev => ({ ...prev, showPrompt: false }));
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.isFullscreen, state.currentText]);

  const handleTextSelect = useCallback((text: TextConfig) => {
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
      }
    }));
  }, [state.settings]);

  const handleExit = useCallback(() => {
    setState(prev => ({
      ...prev,
      isFullscreen: false,
      currentText: null
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
    <AppContainer 
      isWindowActive={isWindowActive}
      style={{
        backgroundColor: state.settings.backgroundColor
      }}
    >
      {!state.isFullscreen && (
        <Header>
          <h1>智能提词器</h1>
        </Header>
      )}

      <MainContent>
        {!isWindowActive && (
          <PromptText isWarning>
            窗口未激活 - 请点击窗口以激活提词器
          </PromptText>
        )}

        {state.isFullscreen && state.currentText && (
          <TextDisplay config={state.currentText}>
            <div 
              className="text-content"
              ref={setScrollContainer}
              dangerouslySetInnerHTML={{ 
                __html: formatContent(state.currentText.content)
              }}
            />
            {state.showPrompt && (
              <PromptText style={{ fontSize: state.settings.promptFontSize }}>
                按 ESC 退出 | 小键盘 +/- 滚动 | Enter 显示映射
              </PromptText>
            )}
          </TextDisplay>
        )}

        {state.showKeyMap && (
          <KeyMapOverlay>
            <h2>快捷键映射 - {currentMode.name}</h2>
            {Object.entries(currentMode.keyMappings).map(([key, config]) => (
              <KeyMapItem key={key}>
                [小键盘 {key}] - {config.title}
              </KeyMapItem>
            ))}
            <Button onClick={toggleKeyMap}>关闭</Button>
          </KeyMapOverlay>
        )}

        {!state.isFullscreen && (
          <>
            <Settings
              defaultFontSize={state.settings.fontSize}
              defaultTextColor={state.settings.textColor}
              defaultBackgroundColor={state.settings.backgroundColor}
              defaultPromptFontSize={state.settings.promptFontSize}
              defaultLineSpacing={state.settings.lineSpacing}
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
  );
};

export default App; 