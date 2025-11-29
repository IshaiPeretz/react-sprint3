export function NoteTodos({ info, isEditMode, onChangeInfo, onToggleTodo }) {
  function toggleDoneLocal(idx) {
    const newTodos = info.todos.map(function (todo, i) {
      if (i === idx) return Object.assign({}, todo, { isDone: !todo.isDone });
      return todo;
    });
    onChangeInfo(
      Object.assign({}, info, {
        todos: newTodos,
      })
    );
  }

  function updateTodoText(idx, txt) {
    const updated = info.todos.map(function (t, i) {
      if (i === idx) return Object.assign({}, t, { txt: txt });
      return t;
    });
    onChangeInfo(
      Object.assign({}, info, {
        todos: updated,
      })
    );
  }

  function addAfter(idx) {
    const updated = info.todos.slice();
    updated.splice(idx + 1, 0, { txt: "", isDone: false });
    onChangeInfo(
      Object.assign({}, info, {
        todos: updated,
      })
    );
  }

  function removeTodo(idx) {
    const updated = info.todos.filter(function (_, i) {
      return i !== idx;
    });
    onChangeInfo(
      Object.assign({}, info, {
        todos: updated,
      })
    );
  }

  function onKey(ev, idx, todo) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      addAfter(idx);
    }

    if (ev.key === "Backspace" && todo.txt === "" && info.todos.length > 1) {
      ev.preventDefault();
      removeTodo(idx);

      requestAnimationFrame(function () {
        const prev = document.querySelector(
          ".todo-item:nth-child(" + idx + ") textarea.todo-textarea"
        );
        if (prev) prev.focus();
      });
    }
  }

  if (isEditMode) {
    return (
      <article className="note-todos">
        <input
          type="text"
          className="todo-title"
          value={info.title}
          placeholder="Title"
          onChange={function (ev) {
            onChangeInfo(
              Object.assign({}, info, {
                title: ev.target.value,
              })
            );
          }}
        />

        <ul>
          {info.todos.map(function (todo, idx) {
            return (
              <li key={idx} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={function () {
                    toggleDoneLocal(idx);
                  }}
                />

                <textarea
                  className="todo-textarea"
                  value={todo.txt}
                  placeholder="List item"
                  onChange={function (ev) {
                    const el = ev.target;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                    updateTodoText(idx, ev.target.value);
                  }}
                  onKeyDown={function (ev) {
                    onKey(ev, idx, todo);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </article>
    );
  }

  return (
    <article className="note-todos">
      <h4>{info.title}</h4>
      <ul>
        {info.todos.map(function (todo, idx) {
          return (
            <li key={idx} className="todo-item">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={function () {
                  onToggleTodo(idx);
                }}
              />
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
              >
                {todo.txt}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
