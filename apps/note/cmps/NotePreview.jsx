import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

const { useState, useEffect } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const [localStyle, setLocalStyle] = useState(note.style);

  useEffect(() => {
    setLocalStyle(note.style);
  }, [note.style]);

  function onChangeInfo(newInfo) {
    onSaveNote({ ...note, info: newInfo, style: localStyle });
  }

  function onSelectColor(color) {
    setLocalStyle({ backgroundColor: color });
  }

  function commitColor() {
    onSaveNote({ ...note, style: localStyle });
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
    <article className="note-preview" style={localStyle}>
      {renderNote()}

      <div className="note-actions">
        <button
          onClick={() => {
            if (isEditMode) {
              commitColor();
              onSaveNote(note);
            }
            setIsEditMode((prev) => !prev);
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>

        <button onClick={() => setShowColors((prev) => !prev)}>🎨</button>

        <button onClick={() => onRemoveNote(note.id)}>X</button>
      </div>

      {showColors && (
        <div className="color-picker">
          {["#fff", "#fde047", "#fca5a5", "#bbf7d0", "#bfdbfe"].map((color) => (
            <div
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
            ></div>
          ))}
        </div>
      )}
    </article>
  );
}
