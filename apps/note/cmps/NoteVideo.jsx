export function NoteVideo({ info }) {
  function getEmbedUrl(url) {
    if (!url) return "";

    const parts = url.split("v=");
    if (parts.length < 2) return "";

    const id = parts[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  const embedUrl = getEmbedUrl(info.url);

  return (
    <article className="note-video">
      {info.title && <h4>{info.title}</h4>}

      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </article>
  );
}
