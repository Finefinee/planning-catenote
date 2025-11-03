import React, { useState } from 'react';

function Sidebar({ categories, onNewNote, onAddCategory, activeCategory, onSelectCategory, onEditCategory, onDeleteCategory }) {
  // 어떤 카테고리 위에 마우스가 올라와 있는지 추적하는 상태
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  return (
    <aside className="sidebar">
      <button className="new-note-btn" onClick={onNewNote}>
        + 새 글 작성
      </button>
      
      <div className="category-header">
        <span>카테고리</span>
        <button className="add-category-btn" onClick={onAddCategory}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.33331V12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <nav className="category-nav">
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`category-item ${cat.id === activeCategory ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              // 마우스가 li 안으로 들어오거나 나갈 때 상태 업데이트
              onMouseEnter={() => setHoveredCategoryId(cat.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}
            >
              <span className="category-name">{cat.name}</span>
              
              {/* 마우스가 올라온 카테고리에만 수정/삭제 버튼 표시 */}
              {hoveredCategoryId === cat.id ? (
                <div className="category-actions">
                  <button onClick={(e) => { e.stopPropagation(); onEditCategory(cat.id); }}>수정</button>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }}>삭제</button>
                </div>
              ) : (
                // 평소에는 읽지 않은 글 개수만 표시
                cat.unread > 0 && <span className="unread-count">{cat.unread}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;