export function NoteTxt({ info, isEditMode, onChangeInfo }) {
  function handleChange(ev) {
    onChangeInfo({ ...info, txt: ev.target.value });
  }

  if (isEditMode) {
    return (
      <div>
        <input
          type="text"
          value={info.title}
          onChange={(ev) => onChangeInfo({ ...info, title: ev.target.value })}
          autoFocus
        />
        <input type="text" value={info.txt} onChange={handleChange} />
      </div>
    );
  }

  return (
    <article>
      {info.title && <h4>{info.title}</h4>}
      <p>{info.txt}</p>
    </article>
  );
}
