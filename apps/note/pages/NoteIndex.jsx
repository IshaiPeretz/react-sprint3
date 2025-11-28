const { useState, useEffect } = React;
import "../../../assets/css/apps/note/cmps/NoteAdd.css";
import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";
import { NoteSidebar } from "../cmps/NoteSidebar.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState(null);
  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [filterBy]);

  function loadNotes() {
    notesService.query(filterBy).then((notes) => setNotes(notes));
  }

  function onRemoveNote(noteId) {
    notesService.remove(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  }

  function onSaveNote(updatedNote) {
    notesService.save(updatedNote).then(() => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    });
  }

  function onAddNote({ title, txt, noteType }) {
    const newNote = notesService.getEmptyNote(noteType);

    switch (noteType) {
      case "NoteTxt":
        newNote.info.title = title;
        newNote.info.txt = txt;
        break;

      case "NoteImg":
      case "NoteVideo":
        newNote.info.title = title;
        newNote.info.url = txt;
        break;

      case "NoteTodos":
        newNote.info.title = title;
        newNote.info.todos = txt;
        break;

      default:
        newNote.info.title = title;
        newNote.info.txt = txt;
        break;
    }

    notesService.save(newNote).then((savedNote) => {
      setNotes((prevNotes) => [savedNote, ...(prevNotes || [])]);
    });
  }

  function onChangeSearch(txt) {
    setFilterBy((prev) => ({ ...prev, txt }));
  }

  function onToggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <NoteHeader
        searchTxt={filterBy.txt}
        onChangeSearch={onChangeSearch}
        onToggleSidebar={onToggleSidebar}
      />

      <section className="note-body">
        <NoteSidebar isOpen={isSidebarOpen} />

        <main className="note-main">
          <NoteAdd onAddNote={onAddNote} />
          <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
          />
        </main>
      </section>
    </section>
  );
}
