export function NoteVideo({ info, isEditMode, onChangeInfo }) {
  function getEmbedUrl(url) {
    if (!url) return "";
    const parts = url.split("v=");
    if (parts.length < 2) return "";
    const id = parts[1].split("&")[0];
    return "https://www.youtube.com/embed/" + id;
  }

  const embedUrl = getEmbedUrl(info.url);

  if (isEditMode) {
    return (
      <article className="note-video">
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
          type="text"
          value={info.url || ""}
          placeholder="YouTube URL"
          onChange={function (ev) {
            onChangeInfo(
              Object.assign({}, info, {
                url: ev.target.value,
              })
            );
          }}
        />

        {embedUrl && (
          <iframe
            width="100%"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </article>
    );
  }

  return (
    <article className="note-video">
      {info.title && <h4>{info.title}</h4>}

      {embedUrl && (
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </article>
  );
}
