import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import './App.css';

function App() {

  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || []);
  
  const [activeCategory, setActiveCategory] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    return savedCategories.length > 0 ? savedCategories[0].id : null;
  });
  
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => { localStorage.setItem('notes', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('categories', JSON.stringify(categories)); }, [categories]);

  const categoriesWithUnread = categories.map(category => ({
    ...category,
    unread: notes.filter(note => note.categoryId === category.id && note.unread).length,
  }));

  const handleAddCategory = () => {
    const name = prompt("새 카테고리 이름을 입력하세요:");
    // 공백 확인
    if (name && name.trim() !== '') {
      const newCategory = { id: Date.now(), name: name.trim() };
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      if (categories.length === 0) {
        setActiveCategory(newCategory.id);
      }
    }
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find(c => c.id === categoryId);
    const newName = prompt("카테고리 이름을 수정하세요:", categoryToEdit.name);
    // 새 이름이 존재하고, 공백 제거 후 비어있지 않으며, 기존 이름과 다를 경우에만 수정
    if (newName && newName.trim() !== '' && newName.trim() !== categoryToEdit.name) {
      setCategories(categories.map(c => 
        c.id === categoryId ? { ...c, name: newName.trim() } : c
      ));
    }
  };
  
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("정말로 이 카테고리를 삭제하시겠습니까? 관련된 모든 노트도 함께 삭제됩니다.")) {
      setNotes(notes.filter(note => note.categoryId !== categoryId));
      setCategories(categories.filter(c => c.id !== categoryId));
      if (activeCategory === categoryId) {
        const remainingCategories = categories.filter(c => c.id !== categoryId);
        setActiveCategory(remainingCategories.length > 0 ? remainingCategories[0].id : null);
      }
    }
  };

  const handleNewNote = () => {
    if (!activeCategory) {
      alert("먼저 카테고리를 추가하거나 선택해주세요.");
      return;
    }
    const newNote = {
      id: Date.now(),
      categoryId: activeCategory,
      title: '',
      content: '',
      unread: true, // ★ 새 글은 '읽지 않음' 상태로 생성
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id); // 새 글을 바로 열어주지만, unread 상태는 유지됨
  };

  // 글을 선택하면 unread를 false로 변경 -> 읽음 처리
  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
    setNotes(notes.map(note => note.id === noteId ? { ...note, unread: false } : note));
  };
  
  const handleUpdateNote = (noteId, field, value) => {
    setNotes(notes.map(note => note.id === noteId ? { ...note, [field]: value } : note));
  };

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveNoteId(null);
  };

  const handleDeleteNote = (noteIdToDelete) => {
    if (window.confirm("정말로 이 노트를 삭제하시겠습니까?")) {
      setNotes(notes.filter(note => note.id !== noteIdToDelete));
      setActiveNoteId(null);
    }
  };

  const handleUnreadNote = (noteId) => {
    setActiveNoteId(noteId);
    setNotes(notes.map(note => note.id === noteId ? { ...note, unread: true } : note));
  }

  const notesForActiveCategory = activeCategory 
    ? notes.filter(note => note.categoryId === activeCategory).sort((a, b) => b.id - a.id)
    : [];

  const activeNote = notes.find(note => note.id === activeNoteId);

  return (
    <div className="app-container">
      <Sidebar
        categories={categoriesWithUnread}
        onNewNote={handleNewNote}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}     // 수정 함수 전달
        onDeleteCategory={handleDeleteCategory} // 삭제 함수 전달
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />
      <main className="main-content">
        <NoteList 
          notes={notesForActiveCategory}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
        />
        <Editor 
          activeNote={activeNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          onUnreadNote={handleUnreadNote}
        />
      </main>
    </div>
  );
}

export default App;