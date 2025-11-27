export function NoteTodos({ info, isEditMode, onChangeInfo }) {
  function toggleDone(idx) {
    const newTodos = info.todos.map((todo, i) =>
      i === idx ? { ...todo, isDone: !todo.isDone } : todo
    );
    onChangeInfo({ ...info, todos: newTodos });
  }

  if (isEditMode) {
    return (
      <article className="note-todos">
        <h4>{info.title}</h4>
        <ul>
          {info.todos.map((todo, idx) => (
            <li key={idx}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDone(idx)}
              />
              <input
                type="text"
                value={todo.txt}
                onChange={(ev) => {
                  const updated = info.todos.map((t, i) =>
                    i === idx ? { ...t, txt: ev.target.value } : t
                  );
                  onChangeInfo({ ...info, todos: updated });
                }}
              />
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="note-todos">
      <h4>{info.title}</h4>
      <ul>
        {info.todos.map((todo, idx) => (
          <li key={idx}>
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
