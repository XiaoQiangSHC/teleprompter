import React, { useState } from 'react';
import styled from 'styled-components';
import { TextConfig, KeyMapping } from '../types/types';

const Panel = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #4a90e2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #357abd;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

interface ConfigurationPanelProps {
  keyMappings: KeyMapping;
  onUpdate: (key: string, config: TextConfig) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  keyMappings,
  onUpdate
}) => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [config, setConfig] = useState<TextConfig>(keyMappings[selectedKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(selectedKey, config);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedKey(key);
    setConfig(keyMappings[key]);
  };

  return (
    <Panel>
      <h2>配置面板</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>选择按键映射</Label>
          <Select value={selectedKey} onChange={handleKeyChange}>
            {Object.keys(keyMappings).map(key => (
              <option key={key} value={key}>
                按键 {key} - {keyMappings[key].title}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>标题</Label>
          <Input
            type="text"
            value={config.title}
            onChange={e => setConfig({ ...config, title: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label>内容</Label>
          <TextArea
            value={config.content}
            onChange={e => setConfig({ ...config, content: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label>字体大小 (px)</Label>
          <Input
            type="number"
            value={config.fontSize}
            onChange={e => setConfig({ ...config, fontSize: Number(e.target.value) })}
            min="12"
            max="120"
          />
        </FormGroup>

        <FormGroup>
          <Label>文本颜色</Label>
          <Input
            type="color"
            value={config.color}
            onChange={e => setConfig({ ...config, color: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label>行间距</Label>
          <Input
            type="number"
            value={config.lineHeight}
            onChange={e => setConfig({ ...config, lineHeight: Number(e.target.value) })}
            min="1"
            max="3"
            step="0.1"
          />
        </FormGroup>

        <FormGroup>
          <Label>对齐方式</Label>
          <Select
            value={config.textAlign}
            onChange={e => setConfig({ ...config, textAlign: e.target.value as 'left' | 'center' | 'right' })}
          >
            <option value="left">左对齐</option>
            <option value="center">居中</option>
            <option value="right">右对齐</option>
          </Select>
        </FormGroup>

        <Button type="submit">保存配置</Button>
      </Form>
    </Panel>
  );
};

export default ConfigurationPanel; 