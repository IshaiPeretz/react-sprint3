const { useState, useEffect, useRef } = React;
import "../../../assets/css/apps/note/cmps/NoteAdd.css";

export function NoteAdd({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [txt, setTxt] = useState("");
  const [noteType, setNoteType] = useState("NoteTxt");
  const formRef = useRef(null);

  function save() {
    if (!txt && !title) return;
    onAddNote({ title, txt, noteType });
    setTitle("");
    setTxt("");
  }

  function onSubmit(ev) {
    ev.preventDefault();
    save();
    setIsExpanded(false);
  }

  useEffect(() => {
    function handleClick(ev) {
      if (!isExpanded) return;
      if (formRef.current && !formRef.current.contains(ev.target)) {
        save();
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isExpanded, title, txt, noteType]);

  return (
    <section className="note-add">
      <form ref={formRef} onSubmit={onSubmit}>
        {isExpanded && (
          <input
            className="note-title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        )}

        <div className="note-add-input" onClick={() => setIsExpanded(true)}>
          <input
            type="text"
            placeholder="Take a note..."
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

        {isExpanded && (
          <button
            type="button"
            className="close-btn"
            onClick={() => {
              save();
              setIsExpanded(false);
            }}
          >
            Close
          </button>
        )}
      </form>
    </section>
  );
}
