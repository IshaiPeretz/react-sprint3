import { notesService } from "../services/note.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

export function NoteEdit() {
  const [noteToEdit, setNoteToEdit] = useState(
    notesService.getEmptyNote("NoteTxt")
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    if (noteId) loadNote();
  }, []);

  function loadNote() {
    setIsLoading(true);
    notesService
      .get(noteId)
      .then((note) => setNoteToEdit(note))
      .finally(() => setIsLoading(false));
  }

  function handleChange({ target }) {
    const { name, value } = target;

    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [name]: value },
    }));
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    notesService.save(noteToEdit).then(() => navigate("/note"));
  }

  const { txt } = noteToEdit.info;

  return (
    <section className={"note-edit" + (isLoading ? " loading" : "")}>
      <h1>{noteId ? "Edit Note" : "Add Note"}</h1>

      <form onSubmit={onSaveNote}>
        <label>Text</label>
        <input type="text" name="txt" value={txt} onChange={handleChange} />

        <div>
          <button>Save</button>
          <Link to="/note">
            <button type="button">Back</button>
          </Link>
        </div>
      </form>
    </section>
  );
}
