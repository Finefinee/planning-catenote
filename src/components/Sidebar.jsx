import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: ${props => props.theme.sizes.sidebarWidth};
  min-width: ${props => props.theme.sizes.sidebarWidth};
  background-color: #111;
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const NewNoteBtn = styled.button`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  margin-bottom: 1.5rem;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
  }

  &:focus {
    outline: none;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.accent};
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const AddCategoryBtn = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.accent};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 28px;
  height: 28px;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
    color: ${props => props.theme.colors.foreground};
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CategoryNav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${props => props.$isActive ? '#2a2a2a' : 'transparent'};

  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
  }

  &:focus {
    outline: none;
  }
`;

const CategoryName = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    background-color: ${props => props.theme.colors.hoverBg};
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.accent};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.75rem;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.foreground};
      border-color: ${props => props.theme.colors.accent};
    }

    &:focus {
      outline: none;
    }
  }
`;

const UnreadCount = styled.span`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

function Sidebar({ categories, onNewNote, onAddCategory, activeCategory, onSelectCategory, onEditCategory, onDeleteCategory }) {
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  return (
    <SidebarContainer>
      <NewNoteBtn onClick={onNewNote}>
        + 새 글 작성
      </NewNoteBtn>
      
      <CategoryHeader>
        <span>카테고리</span>
        <AddCategoryBtn onClick={onAddCategory}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.33331V12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </AddCategoryBtn>
      </CategoryHeader>

      <CategoryNav>
        <ul>
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              $isActive={cat.id === activeCategory}
              onClick={() => onSelectCategory(cat.id)}
              onMouseEnter={() => setHoveredCategoryId(cat.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}
            >
              <CategoryName>{cat.name}</CategoryName>
              
              {hoveredCategoryId === cat.id ? (
                <CategoryActions>
                  <button onClick={(e) => { e.stopPropagation(); onEditCategory(cat.id); }}>수정</button>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }}>삭제</button>
                </CategoryActions>
              ) : (
                cat.unread > 0 && <UnreadCount>{cat.unread}</UnreadCount>
              )}
            </CategoryItem>
          ))}
        </ul>
      </CategoryNav>
    </SidebarContainer>
  );
}

export default Sidebar;