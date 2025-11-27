export function NoteTodos({ info, isEditMode, onChangeInfo, onToggleTodo }) {
  function toggleDoneLocal(idx) {
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
            <li key={idx} className="todo-item">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDoneLocal(idx)}
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
          <li key={idx} className="todo-item">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => onToggleTodo(idx)}
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
