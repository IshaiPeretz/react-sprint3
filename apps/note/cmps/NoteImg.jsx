export function NoteImg({ info }) {
  return (
    <article className="note-img">
      <h4>{info.title}</h4>
      <img src={info.url} alt={info.title} />
    </article>
  );
}
