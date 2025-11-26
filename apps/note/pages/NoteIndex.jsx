const { useState, useEffect } = React;

import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  function loadNotes() {
    notesService.query().then((notes) => setNotes(notes));
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

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onSaveNote={onSaveNote}
      />
    </section>
  );
}
