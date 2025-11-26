import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onRemoveNote, onSaveNote }) {
  if (!Array.isArray(notes)) return <div>Loading...</div>;
  if (!notes.length) return <div>No notes to show...</div>;

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          <NotePreview
            note={note}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
          />
        </li>
      ))}
    </ul>
  );
}
