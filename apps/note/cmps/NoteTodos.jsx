export function NoteTodos({ info, isEditMode, onChangeInfo }) {
  function toggleDone(idx) {
    const updated = info.todos.map((todo, i) =>
      i === idx ? { ...todo, isDone: !todo.isDone } : todo
    );
    onChangeInfo({ ...info, todos: updated });
  }

  function updateTxt(idx, value) {
    const updated = info.todos.map((todo, i) =>
      i === idx ? { ...todo, txt: value } : todo
    );
    onChangeInfo({ ...info, todos: updated });
  }

  if (isEditMode) {
    return (
      <article className="note-todos">
        {info.title && <h4>{info.title}</h4>}

        <ul>
          {info.todos.map((todo, idx) => (
            <li key={idx} className="todo-item">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDone(idx)}
              />

              <input
                type="text"
                value={todo.txt}
                onChange={(ev) => updateTxt(idx, ev.target.value)}
                className="todo-text-input"
              />
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="note-todos">
      {info.title && <h4>{info.title}</h4>}

      <ul>
        {info.todos.map((todo, idx) => (
          <li key={idx} className="todo-item">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toggleDone(idx)}
            />

            <span
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
            >
              {todo.txt}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
