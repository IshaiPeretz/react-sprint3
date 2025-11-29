export function NoteTxt({ info, isEditMode, onChangeInfo }) {
  function onTitleChange(ev) {
    onChangeInfo(
      Object.assign({}, info, {
        title: ev.target.value,
      })
    );
  }

  function onTxtChange(ev) {
    const el = ev.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    onChangeInfo(
      Object.assign({}, info, {
        txt: ev.target.value,
      })
    );
  }

  if (isEditMode) {
    return (
      <article className="note-txt">
        <input
          type="text"
          value={info.title || ""}
          placeholder="Title"
          onChange={onTitleChange}
        />
        <textarea
          rows={3}
          value={info.txt || ""}
          placeholder="Take a note..."
          onChange={onTxtChange}
        ></textarea>
      </article>
    );
  }

  return (
    <article className="note-txt">
      {info.title && <h4>{info.title}</h4>}
      {info.txt && <p>{info.txt}</p>}
    </article>
  );
}
