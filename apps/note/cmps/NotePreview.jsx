import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

const { useState, useEffect, useRef } = React;

export function NotePreview({ note, onRemoveNote, onSaveNote, onPinNote }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [draftNote, setDraftNote] = useState(note);

  const noteRef = useRef(null);
  const paletteRef = useRef(null);

  useEffect(
    function () {
      setDraftNote(note);
    },
    [note.id, note.info, note.style]
  );

  useEffect(
    function () {
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
      return function () {
        document.removeEventListener("mousedown", handleClick);
      };
    },
    [isEditMode, showColors, draftNote]
  );

  function onChangeInfo(newInfo) {
    setDraftNote(function (prev) {
      return Object.assign({}, prev, { info: newInfo });
    });
  }

  function onToggleTodo(idx) {
    setDraftNote(function (prev) {
      const todos = prev.info.todos.map(function (todo, i) {
        if (i === idx) return Object.assign({}, todo, { isDone: !todo.isDone });
        return todo;
      });
      const updated = Object.assign({}, prev, {
        info: Object.assign({}, prev.info, { todos }),
      });
      onSaveNote(updated);
      return updated;
    });
  }

  function onChangeColor(color) {
    setDraftNote(function (prev) {
      const updated = Object.assign({}, prev, {
        style: Object.assign({}, prev.style, { backgroundColor: color }),
      });
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
        return (
          <NoteImg
            info={draftNote.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
            onPickImage={function (ev) {
              const file = ev.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = function (e) {
                onChangeInfo(
                  Object.assign({}, draftNote.info, { url: e.target.result })
                );
              };
              reader.readAsDataURL(file);
            }}
          />
        );
      case "NoteTodos":
        return (
          <NoteTodos
            info={draftNote.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
            onToggleTodo={onToggleTodo}
          />
        );
      case "NoteVideo":
        return (
          <NoteVideo
            info={draftNote.info}
            isEditMode={isEditMode}
            onChangeInfo={onChangeInfo}
          />
        );
      default:
        return <div>Unknown note type</div>;
    }
  }

  return (
    <article
      ref={noteRef}
      className={`note-preview ${isEditMode ? "editing" : ""}`}
      style={draftNote.style}
    >
      <button className="pin-btn" onClick={() => onPinNote(note.id)}>
        <i
          className="fa-solid fa-thumbtack"
          style={{
            transform: note.isPinned ? "rotate(45deg)" : "rotate(0deg)",
            opacity: note.isPinned ? 0.4 : 1,
          }}
        ></i>
      </button>

      {renderNote()}

      <div className="note-actions">
        <button className="note-action-btn" onClick={onToggleEdit}>
          <i className="fa-solid fa-pen"></i>
        </button>

        <button
          className="note-action-btn"
          onClick={function () {
            setShowColors((prev) => !prev);
          }}
        >
          <i className="fa-solid fa-palette"></i>
        </button>

        <button
          className="note-action-btn"
          onClick={function () {
            onRemoveNote(note.id);
          }}
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
          ].map(function (color) {
            return (
              <div
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={function () {
                  onChangeColor(color);
                }}
              />
            );
          })}
        </div>
      )}
    </article>
  );
}
