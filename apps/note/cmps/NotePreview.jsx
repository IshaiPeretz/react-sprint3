import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

const { useState } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localInfo, setLocalInfo] = useState(note.info);

  function onChangeInfo(newInfo) {
    setLocalInfo(newInfo); 
  }

  function onToggleEdit() {
    if (isEditMode) {
      onSaveNote({ ...note, info: localInfo }); 
    }
    setIsEditMode(!isEditMode);
  }

  function renderNote() {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            info={localInfo}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
          />
        );

      case "NoteImg":
        return <NoteImg info={localInfo} />;

      case "NoteTodos":
        return (
          <NoteTodos
            info={localInfo}
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

      <div className="note-preview-actions">
        <button onClick={onToggleEdit}>{isEditMode ? "Save" : "Edit"}</button>

        <button onClick={() => onRemoveNote(note.id)}>X</button>
      </div>
    </article>
  );
}
