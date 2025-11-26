const { useState } = React;
import "../../../assets/css/apps/note/cmps/NoteAdd.css";

export function NoteAdd({ onAddNote }) {
  const [txt, setTxt] = useState("");
  const [noteType, setNoteType] = useState("NoteTxt");

  function onSubmit(ev) {
    ev.preventDefault();
    if (!txt) return;
    onAddNote({ txt, noteType });
    setTxt("");
  }

  function getPlaceholder() {
    if (noteType === "NoteImg") return "Enter image URL...";
    if (noteType === "NoteVideo") return "Enter video URL...";
    if (noteType === "NoteTodos") return "Enter comma separated list...";
    return "What's on your mind...";
  }

  return (
    <section className="note-add">
      <form onSubmit={onSubmit}>
        <div className="note-add-input">
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={txt}
            onChange={(ev) => setTxt(ev.target.value)}
          />
          <div className="note-type-actions">
            <button type="button" onClick={() => setNoteType("NoteTxt")}>
              <i className="fa-solid fa-font"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteImg")}>
              <i className="fa-regular fa-image"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteVideo")}>
              <i className="fa-brands fa-youtube"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteTodos")}>
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
