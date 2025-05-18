import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.9));
  border-radius: 20px;
  margin: 1rem;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 144, 226, 0.2);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #4a90e2;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #4a90e2, transparent);
    border-radius: 2px;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
  margin-bottom: 2rem;
`;

const SettingGroup = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 180px;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(74, 144, 226, 0.2);
    transform: translateY(-2px);
  }
`;

const SettingLabel = styled.label`
  font-weight: 500;
  color: #4a90e2;
  font-size: 1.1rem;
  text-align: center;
`;

const ColorInput = styled.input`
  width: 100px;
  height: 40px;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(74, 144, 226, 0.5);
    transform: translateY(-2px);
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (max-width: 350px) {
    flex-direction: column;
  }
`;

const RangeInput = styled.input`
  width: 150px;
  -webkit-appearance: none;
  background: transparent;
  flex-shrink: 1;
  min-width: 100px;
  max-width: 100%;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    background: rgba(74, 144, 226, 0.2);
    border-radius: 3px;
    border: 1px solid rgba(74, 144, 226, 0.3);
  }
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
    margin-top: -7px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  &::-webkit-slider-thumb:hover {
    background: #357abd;
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const ValueDisplay = styled.span`
  color: #4a90e2;
  font-weight: 600;
  font-size: 1.1rem;
  background: rgba(74, 144, 226, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(74, 144, 226, 0.2);
  min-width: 60px;
  text-align: center;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  text-align: right;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  font-size: 0.9rem;
  border-top: 1px solid rgba(74, 144, 226, 0.1);
  margin-top: 2rem;
`;

interface SettingsProps {
  defaultFontSize: number;
  defaultTextColor: string;
  defaultBackgroundColor: string;
  defaultPromptFontSize: number;
  defaultLineSpacing: number;
  onSettingsChange: (settings: {
    fontSize: number;
    textColor: string;
    backgroundColor: string;
    promptFontSize: number;
    lineSpacing: number;
  }) => void;
}

const Settings: React.FC<SettingsProps> = ({
  defaultFontSize,
  defaultTextColor,
  defaultBackgroundColor,
  defaultPromptFontSize = 16,
  defaultLineSpacing = 1.5,
  onSettingsChange
}) => {
  const handleChange = (
    key: 'fontSize' | 'textColor' | 'backgroundColor' | 'promptFontSize' | 'lineSpacing',
    value: string | number
  ) => {
    onSettingsChange({
      fontSize: key === 'fontSize' ? Number(value) : defaultFontSize,
      textColor: key === 'textColor' ? String(value) : defaultTextColor,
      backgroundColor: key === 'backgroundColor' ? String(value) : defaultBackgroundColor,
      promptFontSize: key === 'promptFontSize' ? Number(value) : defaultPromptFontSize,
      lineSpacing: key === 'lineSpacing' ? Number(value) : defaultLineSpacing
    });
  };

  return (
    <SettingsContainer>
      <Title>智能提词器</Title>
      
      <SettingsGrid>
        <SettingGroup>
          <SettingLabel>默认字体大小</SettingLabel>
          <InputContainer>
            <RangeInput
              type="range"
              min="12"
              max="120"
              value={defaultFontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
            />
            <ValueDisplay>{defaultFontSize}px</ValueDisplay>
          </InputContainer>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>默认文字颜色</SettingLabel>
          <ColorInput
            type="color"
            value={defaultTextColor}
            onChange={(e) => handleChange('textColor', e.target.value)}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>默认背景颜色</SettingLabel>
          <ColorInput
            type="color"
            value={defaultBackgroundColor}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>提示文字大小</SettingLabel>
          <InputContainer>
            <RangeInput
              type="range"
              min="12"
              max="48"
              value={defaultPromptFontSize}
              onChange={(e) => handleChange('promptFontSize', e.target.value)}
            />
            <ValueDisplay>{defaultPromptFontSize}px</ValueDisplay>
          </InputContainer>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>行间距</SettingLabel>
          <InputContainer>
            <RangeInput
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={defaultLineSpacing}
              onChange={(e) => handleChange('lineSpacing', e.target.value)}
            />
            <ValueDisplay>{defaultLineSpacing}</ValueDisplay>
          </InputContainer>
        </SettingGroup>
      </SettingsGrid>

      {/* 这里应该是键盘映射设置的内容 */}
      
      <AuthorInfo>by XiaoQiangSHC © 2025</AuthorInfo>
    </SettingsContainer>
  );
};

export default Settings; 