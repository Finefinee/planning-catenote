import React from 'react';
import styled from 'styled-components';

const NoteListContainer = styled.div`
  width: ${props => props.theme.sizes.noteListWidth};
  min-width: ${props => props.theme.sizes.noteListWidth};
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow-y: auto;
`;

const NoteListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
`;

const UnreadFilterBtn = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(88,166,255,0.12), 0 0 0 1px rgba(88,166,255,0.6);
    border-color: ${props => props.theme.colors.blue};
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const NoteListItem = styled.div`
  position: relative;
  padding: 1rem 2.5rem 1rem 2.5rem;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  user-select: none;
  background-color: ${props => props.$isActive ? '#2a2a2a' : 'transparent'};

  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
  }

  &:focus {
    outline: none;
  }

  ${props => props.$unread && `
    &::before {
      content: '•';
      position: absolute;
      left: 16rem;
      top: 1rem;
      font-size: 5rem;
      color: ${props.theme.colors.blue};
      line-height: 1;
    }
  `}
`;

const NoteTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
  font-weight: 800;
`;

const NoteExcerpt = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.accent};
  margin: 0;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteListEmpty = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.accent};
`;

function NoteList({ notes, activeNoteId, onSelectNote, showUnreadOnly, setShowUnreadOnly }) {
  return (
    <NoteListContainer>
      <NoteListHeader>
        <strong>글 목록</strong>
        <div>
          <UnreadFilterBtn onClick={() => setShowUnreadOnly(!showUnreadOnly)}>
            {showUnreadOnly ? '모두 보기' : '안 읽은 글만 보기'}
          </UnreadFilterBtn>
        </div>
      </NoteListHeader>

      {notes.length === 0 ? (
        <NoteListEmpty>이 카테고리에는 글이 없습니다.</NoteListEmpty>
      ) : (
        notes.map((note) => (
          <NoteListItem
            key={note.id}
            $unread={note.unread}
            $isActive={note.id === activeNoteId}
            onClick={() => onSelectNote(note.id)}
          >
            <NoteTitle $unread={note.unread}>{note.title || '새로운 글'}</NoteTitle>
            <NoteExcerpt>{note.content ? note.content.substring(0, 40) + '...' : '내용 없음'}</NoteExcerpt>
          </NoteListItem>
        ))
      )}
    </NoteListContainer>
  );
}

export default NoteList;