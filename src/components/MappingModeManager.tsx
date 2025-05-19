import React, { useState } from 'react';
import styled from 'styled-components';
import { MappingMode, KeyMapping } from '../types/types';

const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.9));
  border-radius: 16px;
  margin: 1rem;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const ModesContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: visible;
  overflow-y: visible;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const ModeCard = styled.div<{ isActive: boolean }>`
  padding: 1rem 1.5rem;
  background: ${props => props.isActive ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 12px;
  border: 1px solid ${props => props.isActive ? 'rgba(74, 144, 226, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  overflow: visible;
  
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${props => props.isActive ? 'rgba(74, 144, 226, 0.25)' : 'rgba(255, 255, 255, 0.08)'};
  }
`;

const ModeName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #4a90e2;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  padding: 0.8rem 1.2rem;
  background: #4a90e2;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #357abd;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.4rem 0.8rem;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: rgba(74, 144, 226, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

interface MappingModeManagerProps {
  modes: MappingMode[];
  currentModeId: string;
  onModeSelect: (modeId: string) => void;
  onModeAdd: (mode: MappingMode) => void;
  onModeUpdate: (mode: MappingMode) => void;
  onModeDelete: (modeId: string) => void;
  currentMappings: KeyMapping;
}

const MappingModeManager: React.FC<MappingModeManagerProps> = ({
  modes,
  currentModeId,
  onModeSelect,
  onModeAdd,
  onModeUpdate,
  onModeDelete,
  currentMappings
}) => {
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newModeName, setNewModeName] = useState('');

  const handleAddMode = () => {
    if (!newModeName.trim()) return;

    const newMode: MappingMode = {
      id: Date.now().toString(),
      name: newModeName.trim(),
      description: '',
      keyMappings: { ...currentMappings }
    };

    onModeAdd(newMode);
    setIsAddingMode(false);
    setNewModeName('');
  };

  const handleDeleteMode = (modeId: string) => {
    if (modes.length <= 1) {
      alert('至少需要保留一个映射模式！');
      return;
    }
    if (window.confirm('确定要删除这个映射模式吗？')) {
      onModeDelete(modeId);
    }
  };

  return (
    <Container>
      <Title>映射模式管理</Title>
      <ModesContainer>
        {modes.map(mode => (
          <ModeCard
            key={mode.id}
            isActive={mode.id === currentModeId}
            onClick={() => onModeSelect(mode.id)}
          >
            <ModeName>{mode.name}</ModeName>
            <ActionButton
              className="secondary"
              style={{
                visibility: mode.id === currentModeId ? 'visible' : 'hidden',
                pointerEvents: mode.id === currentModeId ? 'auto' : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMode(mode.id);
              }}
            >
              删除
            </ActionButton>
          </ModeCard>
        ))}
      </ModesContainer>

      {!isAddingMode ? (
        <ActionButton onClick={() => setIsAddingMode(true)}>
          添加新模式
        </ActionButton>
      ) : (
        <div>
          <Input
            placeholder="模式名称"
            value={newModeName}
            onChange={(e) => setNewModeName(e.target.value)}
          />
          <ActionButton onClick={handleAddMode}>
            保存
          </ActionButton>
          <ActionButton
            className="secondary"
            onClick={() => setIsAddingMode(false)}
          >
            取消
          </ActionButton>
        </div>
      )}
    </Container>
  );
};

export default MappingModeManager; 