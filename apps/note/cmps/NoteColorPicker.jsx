export function NoteColorPicker({ selected, onSelectColor }) {
  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
  ];

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${selected === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        ></div>
      ))}
    </div>
  );
}
