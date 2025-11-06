import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import { GlobalStyles, theme } from './styles/GlobalStyles';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || []);

  const [showUnreadOnly, setShowUnreadOnly] = useState(() => {
    const saved = localStorage.getItem('showUnreadOnly');
    return saved ? JSON.parse(saved) : false;
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    return savedCategories.length > 0 ? savedCategories[0].id : null;
  });

  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('showUnreadOnly', JSON.stringify(showUnreadOnly));
  }, [showUnreadOnly]);

  // category handlers
  const handleAddCategory = () => {
    const name = prompt('새 카테고리 이름을 입력하세요:');
    if (name && name.trim() !== '') {
      const newCategory = { id: Date.now(), name: name.trim() };
      setCategories(prev => [...prev, newCategory]);
      if (categories.length === 0) setActiveCategory(newCategory.id);
    }
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find(c => c.id === categoryId);
    const newName = prompt('카테고리 이름을 수정하세요:', categoryToEdit.name);
    if (newName && newName.trim() !== '' && newName.trim() !== categoryToEdit.name) {
      setCategories(categories.map(c => c.id === categoryId ? { ...c, name: newName.trim() } : c));
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까? 관련된 모든 노트도 함께 삭제됩니다.')) {
      setNotes(prev => prev.filter(note => note.categoryId !== categoryId));
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      if (activeCategory === categoryId) {
        const remaining = categories.filter(c => c.id !== categoryId);
        setActiveCategory(remaining.length > 0 ? remaining[0].id : null);
      }
    }
  };

  // notes handlers
  const handleNewNote = () => {
    if (!activeCategory) {
      alert('먼저 카테고리를 추가하거나 선택해주세요.');
      return;
    }
    const newNote = { id: Date.now(), categoryId: activeCategory, title: '', content: '', unread: true };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
    setNotes(prev => prev.map(note => note.id === noteId ? { ...note, unread: false } : note));
  };

  const handleUpdateNote = (noteId, field, value) => {
    setNotes(prev => prev.map(note => note.id === noteId ? { ...note, [field]: value } : note));
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('정말로 이 노트를 삭제하시겠습니까?')) {
      setNotes(prev => prev.filter(n => n.id !== noteId));
      setActiveNoteId(null);
    }
  };

  const handleUnreadNote = (noteId) => {
    setActiveNoteId(noteId);
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, unread: true } : n));
  };

  const notesForActiveCategory = activeCategory
    ? notes
        .filter(note => note.categoryId === activeCategory)
        .filter(note => (showUnreadOnly ? note.unread : true))
        .sort((a, b) => b.id - a.id)
    : [];

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Sidebar
          categories={categories}
          onNewNote={handleNewNote}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <MainContent>
          <NoteList
            notes={notesForActiveCategory}
            activeNoteId={activeNoteId}
            onSelectNote={handleSelectNote}
            showUnreadOnly={showUnreadOnly}
            setShowUnreadOnly={setShowUnreadOnly}
          />

          <Editor
            activeNote={activeNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            onUnreadNote={handleUnreadNote}
          />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;