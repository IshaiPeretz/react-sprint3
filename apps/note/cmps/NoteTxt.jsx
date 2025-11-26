export function NoteTxt({ info, isEditMode, onChangeInfo }) {
  function handleChange(ev) {
    onChangeInfo({ txt: ev.target.value });
  }

  if (isEditMode) {
    return (
      <input type="text" value={info.txt} onChange={handleChange} autoFocus />
    );
  }

  return <p>{info.txt}</p>;
}
