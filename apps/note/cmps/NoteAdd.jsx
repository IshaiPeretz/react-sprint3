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

  function onPickImage(ev) {
    const file = ev.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setTxt(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function save() {
    if (!isExpanded) return;

    if (noteType === "NoteTodos") {
      const clean = todos
        .filter(function (t) {
          return t.txt.trim() !== "";
        })
        .map(function (t) {
          return { txt: t.txt.trim(), isDone: false };
        });

      if (!title.trim() && clean.length === 0) return;

      onAddNote({ title: title, todos: clean, type: "NoteTodos" });
    } else if (noteType === "NoteImg") {
      if (!txt.trim()) return;

      onAddNote({
        type: "NoteImg",
        info: {
          title: title,
          url: txt.trim(),
        },
      });
    } else if (noteType === "NoteVideo") {
      if (!txt.trim()) return;

      onAddNote({
        type: "NoteVideo",
        info: {
          title: title,
          url: txt.trim(),
        },
      });
    } else if (noteType === "NoteTxt") {
      if (!txt.trim() && !title.trim()) return;

      onAddNote({ title: title, txt: txt, type: "NoteTxt" });
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

  useEffect(
    function () {
      function handleClick(ev) {
        if (!isExpanded) return;
        if (formRef.current && !formRef.current.contains(ev.target)) {
          save();
          setIsExpanded(false);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return function () {
        document.removeEventListener("mousedown", handleClick);
      };
    },
    [isExpanded, title, txt, noteType, todos]
  );

  useEffect(
    function () {
      setTxt("");
      setTitle("");
      setTodos([{ txt: "", isDone: false }]);
    },
    [noteType]
  );

  function updateTodo(idx, value) {
    const list = todos.slice();
    list[idx].txt = value;
    setTodos(list);
  }

  function onTodoKey(ev, idx) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      const list = todos.slice();
      list.splice(idx + 1, 0, { txt: "", isDone: false });
      setTodos(list);

      setTimeout(function () {
        if (!formRef.current) return;
        const next = formRef.current.querySelector(
          ".todo-row:nth-child(" + (idx + 2) + ") .todo-input"
        );
        if (next) next.focus();
      }, 0);
    }

    if (ev.key === "Backspace" && todos[idx].txt === "" && todos.length > 1) {
      const list = todos.filter(function (_, i) {
        return i !== idx;
      });
      setTodos(list);

      setTimeout(function () {
        if (!formRef.current) return;
        const prev = formRef.current.querySelector(
          ".todo-row:nth-child(" + idx + ") .todo-input"
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
            onChange={function (ev) {
              setTitle(ev.target.value);
            }}
          />
        )}

        <div
          className="note-add-input"
          onClick={function () {
            setIsExpanded(true);
          }}
        >
          <div className="note-add-input-left">
            {!isExpanded && noteType !== "NoteTodos" && (
              <input
                type="text"
                placeholder="Take a note..."
                value={txt}
                onChange={function (ev) {
                  setTxt(ev.target.value);
                }}
              />
            )}

            {!isExpanded && noteType === "NoteTodos" && (
              <div className="todo-row">
                <input type="checkbox" disabled />
                <input
                  className="todo-input"
                  placeholder="List item"
                  readOnly
                />
              </div>
            )}

            {isExpanded && noteType === "NoteTxt" && (
              <textarea
                rows={3}
                placeholder="Take a note..."
                value={txt}
                onChange={function (ev) {
                  setTxt(ev.target.value);
                  autoGrow(ev);
                }}
              />
            )}

            {isExpanded && noteType === "NoteImg" && (
              <div className="note-img-picker">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={onPickImage}
                />

                <button
                  type="button"
                  onClick={function () {
                    const el = document.getElementById("file-upload");
                    if (el) el.click();
                  }}
                >
                  Upload
                </button>

                {txt && (
                  <img
                    src={txt}
                    style={{
                      width: "140px",
                      height: "auto",
                      marginTop: "10px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            )}

            {isExpanded && noteType === "NoteVideo" && (
              <input
                type="text"
                placeholder="YouTube URL..."
                value={txt}
                onChange={function (ev) {
                  setTxt(ev.target.value);
                }}
              />
            )}

            {isExpanded && noteType === "NoteTodos" && (
              <div className="todo-editor">
                {todos.map(function (todo, idx) {
                  return (
                    <div className="todo-row" key={idx}>
                      <input type="checkbox" disabled />
                      <input
                        className="todo-input"
                        value={todo.txt}
                        placeholder={
                          idx === todos.length - 1 ? "List item" : ""
                        }
                        onChange={function (ev) {
                          updateTodo(idx, ev.target.value);
                        }}
                        onKeyDown={function (ev) {
                          onTodoKey(ev, idx);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="note-type-actions">
            <button
              type="button"
              onClick={function () {
                setNoteType("NoteTxt");
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              onClick={function () {
                setNoteType("NoteImg");
              }}
            >
              <i className="fa-regular fa-image"></i>
            </button>
            <button
              type="button"
              onClick={function () {
                setNoteType("NoteVideo");
              }}
            >
              <i className="fa-solid fa-video"></i>
            </button>
            <button
              type="button"
              onClick={function () {
                setNoteType("NoteTodos");
              }}
            >
              <i className="fa-regular fa-square-check"></i>
            </button>
          </div>
        </div>

        {isExpanded && (
          <button
            type="button"
            className="close-btn"
            onClick={function () {
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
