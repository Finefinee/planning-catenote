import React from 'react';

/**
 * 글 목록을 표시하는 컴포넌트
 * @param {object} props
 * @param {Array} props.notes - 표시할 글 목록
 * @param {number|null} props.activeNoteId - 현재 선택된 글의 ID
 * @param {Function} props.onSelectNote - 글을 선택했을 때 호출될 함수
 */
function NoteList({ notes, activeNoteId, onSelectNote }) {
  if (notes.length === 0) {
    return <div className="note-list-empty">이 카테고리에는 글이 없습니다.</div>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-list-item ${note.unread ? 'unread' : ''} ${note.id === activeNoteId ? 'active' : ''}`}
          onClick={() => onSelectNote(note.id)}
        >
          <h3 className="note-title">{note.title || '새로운 글'}</h3>
          <p className="note-excerpt">{note.content ? note.content.substring(0, 40) + '...' : '내용 없음'}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;