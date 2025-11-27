import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

const { useState } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote }) {
  const [isEditMode, setIsEditMode] = useState(false);

  function onChangeInfo(newInfo) {
    onSaveNote({ ...note, info: newInfo });
  }

  function renderNote() {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            info={note.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
          />
        );

      case "NoteImg":
        return <NoteImg info={note.info} />;

      case "NoteTodos":
        return (
          <NoteTodos
            info={note.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
          />
        );

      default:
        return <div>Unknown note type</div>;
    }
  }

  return (
    <article className="note-preview" style={note.style}>
      {renderNote()}

      <button
        onClick={() => {
          if (isEditMode) onSaveNote(note);
          setIsEditMode((prev) => !prev);
        }}
      >
        {isEditMode ? "Save" : "Edit"}
      </button>

      <button onClick={() => onRemoveNote(note.id)}>X</button>
    </article>
  );
}
