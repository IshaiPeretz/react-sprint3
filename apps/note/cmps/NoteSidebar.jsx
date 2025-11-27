export function NoteSidebar({ isOpen, onClose }) {
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

        <button className="sidebar-item active">
          <i className="fa-regular fa-lightbulb"></i>
          <span>Notes</span>
        </button>

        <button className="sidebar-item">
          <i className="fa-regular fa-pen-to-square"></i>
          <span>Edit labels</span>
        </button>

        <button className="sidebar-item">
          <i className="fa-regular fa-folder-closed"></i>
          <span>Archive</span>
        </button>
      </nav>
    </React.Fragment>
  );
}
