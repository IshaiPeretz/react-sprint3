export function NoteTxt({ info, isEditMode, onChangeInfo }) {
  function handleTxtChange(ev) {
    onChangeInfo({ ...info, txt: ev.target.value });
  }

  function handleTitleChange(ev) {
    onChangeInfo({ ...info, title: ev.target.value });
  }

  if (isEditMode) {
    return (
      <article>
        <input
          type="text"
          value={info.title || ""}
          placeholder="Title"
          onChange={handleTitleChange}
          autoFocus
        />
        <input
          type="text"
          value={info.txt || ""}
          placeholder="Note"
          onChange={handleTxtChange}
        />
      </article>
    );
  }

  return (
    <article>
      {info.title && <h4>{info.title}</h4>}
      <p>{info.txt}</p>
    </article>
  );
}
