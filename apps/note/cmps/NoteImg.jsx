const { useRef } = React;

export function NoteImg({ info, isEditMode, onChangeInfo, onPickImage }) {
  const fileInputRef = useRef(null);

  function onUploadClick() {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  if (isEditMode) {
    return (
      <article className="note-img">
        <input
          type="text"
          value={info.title || ""}
          placeholder="Title"
          onChange={function (ev) {
            onChangeInfo(
              Object.assign({}, info, {
                title: ev.target.value,
              })
            );
          }}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onPickImage}
        />

        <button type="button" onClick={onUploadClick}>
          Upload
        </button>

        {info.url && (
          <img
            src={info.url}
            style={{
              width: "140px",
              height: "auto",
              marginTop: "10px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        )}
      </article>
    );
  }

  return (
    <article className="note-img">
      {info.title && <h4>{info.title}</h4>}
      <img src={info.url} alt={info.title} />
    </article>
  );
}
