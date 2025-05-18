import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TextConfig, KeyMapping } from '../types/types';

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  /* 确保最后一行的对齐 */
  &::after {
    content: '';
    grid-column: span 1;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:nth-child(10) {
    grid-column: 2;
  }
`;

const AutoExpandTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  overflow: hidden;
  min-height: 40px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: rgba(74, 144, 226, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: rgba(74, 144, 226, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  min-height: 2.4rem;
`;

const KeyNumber = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(74, 144, 226, 0.7);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(74, 144, 226, 0.3);
  flex-shrink: 0;
`;

const BlockTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #e0e0e0;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
`;

const Button = styled.button`
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

  &.cancel {
    background: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ContentDisplay = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  width: 100%;
  color: #e0e0e0;
  font-size: 1rem;
`;

interface QuickEditProps {
  keyMappings: KeyMapping;
  onUpdate: (key: string, config: TextConfig) => void;
}

const QuickEdit: React.FC<QuickEditProps> = ({ keyMappings, onUpdate }) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = Math.max(40, textArea.scrollHeight) + 'px';
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [editingContent]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingKey !== null &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // 检查内容是否有变化
        if (editingContent === initialContent && editingTitle === initialTitle) {
          handleCancel();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingKey, editingContent, editingTitle, initialContent, initialTitle]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingContent(e.target.value);
  };

  const handleClick = (key: string) => {
    if (editingKey === key) {
      return;
    }
    if (editingKey !== null) {
      setEditingContent('');
      setEditingTitle('');
      setInitialContent('');
      setInitialTitle('');
    }
    setEditingKey(key);
    setEditingContent(keyMappings[key].content);
    setEditingTitle(keyMappings[key].title);
    setInitialContent(keyMappings[key].content);
    setInitialTitle(keyMappings[key].title);
  };

  const handleSave = (key: string) => {
    const config = {
      ...keyMappings[key],
      content: editingContent,
      title: editingTitle
    };
    onUpdate(key, config);
    setEditingKey(null);
    setEditingContent('');
    setEditingTitle('');
    setInitialContent('');
    setInitialTitle('');
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditingContent('');
    setEditingTitle('');
    setInitialContent('');
    setInitialTitle('');
  };

  // 按小键盘布局排序的键位
  const orderedKeys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0']
  ];

  return (
    <EditContainer ref={containerRef}>
      <Title>小键盘映射设置</Title>
      <GridContainer>
        {orderedKeys.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map(key => (
              <TextBlock 
                key={key}
                onClick={() => handleClick(key)}
                style={{
                  background: editingKey === key ? 'rgba(74, 144, 226, 0.1)' : undefined
                }}
              >
                <BlockHeader>
                  <KeyNumber>小键盘 {key}</KeyNumber>
                  {editingKey !== key && (
                    <BlockTitle>{keyMappings[key].title || `文本 ${key}`}</BlockTitle>
                  )}
                </BlockHeader>
                {editingKey === key ? (
                  <>
                    <TitleInput
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      placeholder="输入标题"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <AutoExpandTextArea
                      ref={textAreaRef}
                      value={editingContent}
                      onChange={handleContentChange}
                      placeholder="输入文本内容"
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                    <ButtonGroup>
                      <Button onClick={() => handleSave(key)}>保存</Button>
                      <Button className="cancel" onClick={handleCancel}>取消</Button>
                    </ButtonGroup>
                  </>
                ) : (
                  <ContentDisplay>{keyMappings[key].content}</ContentDisplay>
                )}
              </TextBlock>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>
    </EditContainer>
  );
};

export default QuickEdit; 