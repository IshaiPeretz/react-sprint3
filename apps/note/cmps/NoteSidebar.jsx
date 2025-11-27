
export function NoteSidebar({ isOpen }) {
  return (
    <nav className={`note-sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-item active">
        <i className="fa-regular fa-lightbulb"></i>
        <span>Notes</span>
      </button>

      <button className="sidebar-item">
        <i className="fa-regular fa-bell"></i>
        <span>Reminders</span>
      </button>

      <button className="sidebar-item">
        <i className="fa-regular fa-pen-to-square"></i>
        <span>Edit labels</span>
      </button>

      <button className="sidebar-item">
        <i className="fa-regular fa-folder-closed"></i>
        <span>Archive</span>
      </button>

      <button className="sidebar-item">
        <i className="fa-regular fa-trash-can"></i>
        <span>Trash</span>
      </button>
    </nav>
  );
}
