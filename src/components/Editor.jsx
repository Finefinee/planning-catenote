/**
 * 개별 글의 내용을 보여주고 편집하는 컴포넌트
 * @param {object} props
 * @param {object|null} props.activeNote - 현재 보고 있는 글 객체
 * @param {Function} props.onUpdateNote - 글의 필드(제목, 내용) 업데이트 핸들러
 * @param {Function} props.onDeleteNote - 글 삭제 핸들러
 */
function Editor({ activeNote, onUpdateNote, onDeleteNote, onUnreadNote }) {
  
  if (!activeNote) {
    return (
      <div className="editor-container">
        <div className="editor-placeholder"></div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button className="unread-note-btn" onClick={() => onUnreadNote(activeNote.id)}>
          안읽음
        </button>
        <button className="delete-note-btn" onClick={() => onDeleteNote(activeNote.id)}>
          삭제
        </button>
      </div>
      
      {/* 제목 입력 필드 추가 */}
      <input
        type="text"
        className="editor-title-input"
        value={activeNote.title}
        onChange={(e) => onUpdateNote(activeNote.id, 'title', e.target.value)}
        placeholder="제목을 입력하세요"
        autoFocus // 새 글 작성 시 제목에 바로 포커스
      />

      <textarea
        key={activeNote.id} // 노트가 바뀌어도 content에 집중할 수 있도록 key는 유지
        className="editor-textarea"
        value={activeNote.content}
        onChange={(e) => onUpdateNote(activeNote.id, 'content', e.target.value)}
        placeholder="내용을 입력하세요..."
      />
    </div>
  );
}

export default Editor;