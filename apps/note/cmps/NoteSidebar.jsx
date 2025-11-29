export function NoteSidebar({ isOpen, onClose, onSetTypeFilter, currentType }) {
  return (
    <React.Fragment>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <nav className={`note-sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-sidebar-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <button
          className={`sidebar-item ${currentType === "all" ? "active" : ""}`}
          onClick={() => onSetTypeFilter("all")}
        >
          <i className="fa-regular fa-lightbulb"></i>
          <span>Notes</span>
        </button>

        <button
          className={`sidebar-item ${
            currentType === "NoteTxt" ? "active" : ""
          }`}
          onClick={() => onSetTypeFilter("NoteTxt")}
        >
          <i className="fa-regular fa-pen-to-square"></i>
          <span>TextNote</span>
        </button>

        <button
          className={`sidebar-item ${
            currentType === "NoteImg" ? "active" : ""
          }`}
          onClick={() => onSetTypeFilter("NoteImg")}
        >
          <i className="fa-regular fa-image"></i>
          <span>ImgNote</span>
        </button>

        <button
          className={`sidebar-item ${
            currentType === "NoteVideo" ? "active" : ""
          }`}
          onClick={() => onSetTypeFilter("NoteVideo")}
        >
          <i className="fa-solid fa-video"></i>
          <span>VidNote</span>
        </button>

        <button
          className={`sidebar-item ${
            currentType === "NoteTodos" ? "active" : ""
          }`}
          onClick={() => onSetTypeFilter("NoteTodos")}
        >
          <i className="fa-regular fa-square-check"></i>
          <span>Todos</span>
        </button>
      </nav>
    </React.Fragment>
  );
}
