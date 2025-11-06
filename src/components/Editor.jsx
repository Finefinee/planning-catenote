import React from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const EditorPlaceholder = styled.div`
  flex-grow: 1;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  gap: 0.5rem;
`;

const UnreadNoteBtn = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.blue};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.background};
  }

  &:focus {
    outline: none;
  }
`;

const DeleteNoteBtn = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.red};
  color: ${props => props.theme.colors.red};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.red};
    color: ${props => props.theme.colors.background};
  }

  &:focus {
    outline: none;
  }
`;

const EditorTitleInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.foreground};
  font-size: 2rem;
  font-weight: bold;
  padding-top: 2rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.accent};
  }
`;

const EditorTextarea = styled.textarea`
  flex-grow: 1;
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.foreground};
  font-size: 1.1rem;
  line-height: 1.7;
  padding-top: 2rem;
  resize: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.accent};
  }
`;

/**
 * 개별 글의 내용을 보여주고 편집하는 컴포넌트
 */
function Editor({ activeNote, onUpdateNote, onDeleteNote, onUnreadNote }) {
  if (!activeNote) {
    return (
      <EditorContainer>
        <EditorPlaceholder />
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <UnreadNoteBtn onClick={() => onUnreadNote(activeNote.id)}>
          안읽음
        </UnreadNoteBtn>
        <DeleteNoteBtn onClick={() => onDeleteNote(activeNote.id)}>
          삭제
        </DeleteNoteBtn>
      </EditorHeader>
      
      <EditorTitleInput
        type="text"
        value={activeNote.title}
        onChange={(e) => onUpdateNote(activeNote.id, 'title', e.target.value)}
        placeholder="제목을 입력하세요"
        autoFocus
      />

      <EditorTextarea
        key={activeNote.id}
        value={activeNote.content}
        onChange={(e) => onUpdateNote(activeNote.id, 'content', e.target.value)}
        placeholder="내용을 입력하세요..."
      />
    </EditorContainer>
  );
}

export default Editor;