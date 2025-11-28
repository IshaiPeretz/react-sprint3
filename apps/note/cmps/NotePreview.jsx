import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

const { useState, useEffect, useRef } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [draftNote, setDraftNote] = useState(note);

  const noteRef = useRef();
  const paletteRef = useRef();

  useEffect(() => {
    setDraftNote(note);
  }, [note.id, note.info, note.style]);

  useEffect(() => {
    function handleClick(ev) {
      const outsideNote =
        noteRef.current && !noteRef.current.contains(ev.target);
      const outsidePalette =
        paletteRef.current && !paletteRef.current.contains(ev.target);

      if (outsideNote && isEditMode) {
        onSaveNote(draftNote);
        setIsEditMode(false);
        setShowColors(false);
      }

      if (showColors && outsidePalette) {
        setShowColors(false);
        onSaveNote(draftNote);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isEditMode, showColors, draftNote]);

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
      const updated = {
        ...prev,
        style: { ...prev.style, backgroundColor: color },
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

  return (
    <article ref={noteRef} className="note-preview" style={draftNote.style}>
      {renderNote()}

      <div className="note-actions">
        <button className="note-action-btn" onClick={onToggleEdit}>
          <i className="fa-solid fa-pen"></i>
        </button>

        <button
          className="note-action-btn"
          onClick={() => setShowColors((prev) => !prev)}
        >
          <i className="fa-solid fa-palette"></i>
        </button>

        <button
          className="note-action-btn"
          onClick={() => onRemoveNote(note.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>

      {showColors && (
        <div ref={paletteRef} className="color-picker">
          {[
            "#ffffff",
            "#f28b82",
            "#fbbc04",
            "#fff475",
            "#ccff90",
            "#a7ffeb",
            "#aecbfa",
            "#d7aefb",
          ].map((color) => (
            <div
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => onChangeColor(color)}
            />
          ))}
        </div>
      )}
    </article>
  );
}
