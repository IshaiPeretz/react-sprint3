import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

const { useState, useEffect } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [draftNote, setDraftNote] = useState(note);

  useEffect(() => {
    setDraftNote(note);
  }, [note.id, note.info, note.style]);

  function onChangeInfo(newInfo) {
    setDraftNote((prev) => ({ ...prev, info: newInfo }));
  }

  function onToggleTodo(idx) {
    setDraftNote((prev) => {
      const todos = prev.info.todos.map((todo, i) =>
        i === idx ? { ...todo, isDone: !todo.isDone } : todo
      );
      const updated = { ...prev, info: { ...prev.info, todos } };
      onSaveNote(updated);
      return updated;
    });
  }

  function onChangeColor(color) {
    setDraftNote((prev) => {
      const style = prev.style || {};
      const updated = {
        ...prev,
        style: { ...style, backgroundColor: color },
      };
      onSaveNote(updated);
      return updated;
    });
  }

  function onToggleEdit() {
    if (isEditMode) onSaveNote(draftNote);
    setIsEditMode((prev) => !prev);
    setShowColors(false);
  }

  function renderNote() {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            info={draftNote.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
          />
        );

      case "NoteImg":
        return <NoteImg info={draftNote.info} />;

      case "NoteTodos":
        return (
          <NoteTodos
            info={draftNote.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
            onToggleTodo={onToggleTodo}
          />
        );

      default:
        return <div>Unknown note type</div>;
    }
  }

  const bgStyle = draftNote.style || {};

  return (
    <article className="note-preview" style={bgStyle}>
      {renderNote()}

      <div className="note-actions">
        <button type="button" onClick={onToggleEdit}>
          {isEditMode ? "Save" : "Edit"}
        </button>

        <button type="button" onClick={() => setShowColors((prev) => !prev)}>
          🎨
        </button>

        <button type="button" onClick={() => onRemoveNote(note.id)}>
          X
        </button>
      </div>

      {showColors && (
        <div className="color-picker">
          {["#fff", "#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb"].map(
            (color) => (
              <div
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => onChangeColor(color)}
              ></div>
            )
          )}
        </div>
      )}
    </article>
  );
}
