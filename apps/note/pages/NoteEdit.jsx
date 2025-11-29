import { notesService } from "../services/note.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

export function NoteEdit() {
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    if (noteId) {
      setIsLoading(true);
      notesService
        .get(noteId)
        .then((note) => setNoteToEdit(note))
        .finally(() => setIsLoading(false));
    } else {
      setNoteToEdit(notesService.getEmptyNote("NoteTxt"));
    }
  }, []);

  function handleChange({ target }) {
    const { name, value } = target;
    setNoteToEdit((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }));
  }

  function onPickImage(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setNoteToEdit((prev) => ({
        ...prev,
        info: { ...prev.info, url: e.target.result },
      }));
    };
    reader.readAsDataURL(file);
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    notesService.save(noteToEdit).then(() => navigate("/note"));
  }

  if (!noteToEdit) return null;

  return (
    <section className={"note-edit" + (isLoading ? " loading" : "")}>
      <h1>{noteId ? "Edit Note" : "Add Note"}</h1>

      <form onSubmit={onSaveNote}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={noteToEdit.info.title || ""}
          onChange={handleChange}
        />

        {noteToEdit.type === "NoteTxt" && (
          <>
            <label>Text</label>
            <textarea
              name="txt"
              value={noteToEdit.info.txt || ""}
              onChange={handleChange}
            ></textarea>
          </>
        )}

        {noteToEdit.type === "NoteImg" && (
          <>
            <label>Image</label>

            <input
              type="file"
              accept="image/*"
              id="edit-img-upload"
              style={{ display: "none" }}
              onChange={onPickImage}
            />

            <button
              type="button"
              onClick={() => document.getElementById("edit-img-upload").click()}
            >
              Upload New Image
            </button>

            {noteToEdit.info.url && (
              <img
                src={noteToEdit.info.url}
                style={{
                  width: "180px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            )}
          </>
        )}

        {noteToEdit.type === "NoteVideo" && (
          <>
            <label>Video URL</label>
            <input
              type="text"
              name="url"
              value={noteToEdit.info.url || ""}
              onChange={handleChange}
            />
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <button>Save</button>
          <Link to="/note">
            <button type="button">Back</button>
          </Link>
        </div>
      </form>
    </section>
  );
}
