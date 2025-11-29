const { useState, useEffect, useRef } = React;

export function NoteAdd({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [txt, setTxt] = useState("");
  const [noteType, setNoteType] = useState("NoteTxt");
  const [todos, setTodos] = useState([{ txt: "", isDone: false }]);
  const formRef = useRef(null);

  function autoGrow(ev) {
    const el = ev.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  function save() {
    if (!isExpanded) return;

    if (noteType === "NoteTodos") {
      const clean = todos
        .filter((t) => t.txt.trim() !== "")
        .map((t) => ({
          txt: t.txt.trim(),
          isDone: false,
        }));
      if (!title && clean.length === 0) return;
      onAddNote({ title, txt: clean, noteType });
    } else {
      if (!txt && !title) return;
      onAddNote({ title, txt, noteType });
    }

    setTitle("");
    setTxt("");
    setTodos([{ txt: "", isDone: false }]);
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
  }, [isExpanded, title, txt, noteType, todos]);

  useEffect(() => {
    setTxt("");
    setTitle("");
    setTodos([{ txt: "", isDone: false }]);
  }, [noteType]);

  function updateTodo(idx, value) {
    const list = [...todos];
    list[idx].txt = value;
    setTodos(list);
  }

  function onTodoKey(ev, idx) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      const list = [...todos];
      list.splice(idx + 1, 0, { txt: "", isDone: false });
      setTodos(list);

      setTimeout(() => {
        const next =
          formRef.current &&
          formRef.current.querySelector(
            `.todo-row:nth-child(${idx + 2}) .todo-input`
          );
        if (next) next.focus();
      }, 0);
    }

    if (ev.key === "Backspace" && todos[idx].txt === "" && todos.length > 1) {
      const list = todos.filter((_, i) => i !== idx);
      setTodos(list);

      setTimeout(() => {
        const prev =
          formRef.current &&
          formRef.current.querySelector(
            `.todo-row:nth-child(${idx}) .todo-input`
          );
        if (prev) prev.focus();
      }, 0);
    }
  }

  return (
    <section className="note-add">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={isExpanded ? "expanded" : ""}
      >
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
          {!isExpanded && noteType !== "NoteTodos" && (
            <input
              type="text"
              placeholder="Take a note..."
              value={txt}
              onChange={(ev) => setTxt(ev.target.value)}
            />
          )}

          {!isExpanded && noteType === "NoteTodos" && (
            <div className="todo-row">
              <input type="checkbox" disabled />
              <input className="todo-input" placeholder="List item" readOnly />
            </div>
          )}

          {isExpanded && noteType === "NoteTxt" && (
            <textarea
              rows={3}
              placeholder="Take a note..."
              value={txt}
              onChange={(ev) => {
                setTxt(ev.target.value);
                autoGrow(ev);
              }}
            />
          )}

          {isExpanded && noteType === "NoteImg" && (
            <input
              type="text"
              placeholder="Image URL..."
              value={txt}
              onChange={(ev) => setTxt(ev.target.value)}
            />
          )}

          {isExpanded && noteType === "NoteVideo" && (
            <input
              type="text"
              placeholder="YouTube URL..."
              value={txt}
              onChange={(ev) => setTxt(ev.target.value)}
            />
          )}

          {isExpanded && noteType === "NoteTodos" && (
            <div className="todo-editor">
              {todos.map((todo, idx) => (
                <div className="todo-row" key={idx}>
                  <input type="checkbox" disabled />
                  <input
                    className="todo-input"
                    value={todo.txt}
                    placeholder={idx === todos.length - 1 ? "List item" : ""}
                    onChange={(ev) => updateTodo(idx, ev.target.value)}
                    onKeyDown={(ev) => onTodoKey(ev, idx)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="note-type-actions">
            <button type="button" onClick={() => setNoteType("NoteTxt")}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteImg")}>
              <i className="fa-regular fa-image"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteVideo")}>
              <i className="fa-solid fa-video"></i>
            </button>
            <button type="button" onClick={() => setNoteType("NoteTodos")}>
              <i className="fa-regular fa-square-check"></i>
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
