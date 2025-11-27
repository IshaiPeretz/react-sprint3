
export function NoteHeader({ searchTxt, onChangeSearch, onToggleSidebar }) {
  function handleChange(ev) {
    onChangeSearch(ev.target.value);
  }

  return (
    <header className="note-header">
      <div className="note-header-left">
        <button className="icon-btn menu-btn" onClick={onToggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="note-logo">
          <i className="fa-regular fa-lightbulb"></i>
          <span>Notes</span>
        </div>
      </div>

      <div className="note-header-search">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchTxt}
          onChange={handleChange}
        />
      </div>

      {/* <div className="note-header-right">
        <button className="icon-btn">
          <i className="fa-regular fa-question-circle"></i>
        </button>
        <button className="icon-btn">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div> */}
    </header>
  );
}
