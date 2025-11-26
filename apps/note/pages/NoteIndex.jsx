const { useState, useEffect } = React;
import "../../../assets/css/apps/note/cmps/NoteAdd.css";
import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";

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

  function onAddNote({ txt, noteType }) {
    const newNote = notesService.getEmptyNote(noteType);
    if (noteType === "NoteTxt") newNote.info.txt = txt;
    if (noteType === "NoteImg" || noteType === "NoteVideo")
      newNote.info.url = txt;
    if (noteType === "NoteTodos")
      newNote.info.todos = txt.split(",").map((item) => ({
        txt: item.trim(),
        isDone: false,
      }));
    notesService.save(newNote).then((savedNote) => {
      setNotes((prev) => [savedNote, ...prev]);
    });
  }

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <NoteAdd onAddNote={onAddNote} />
      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onSaveNote={onSaveNote}
      />
    </section>
  );
}
