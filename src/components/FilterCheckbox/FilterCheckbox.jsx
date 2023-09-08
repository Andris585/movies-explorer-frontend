import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" />
      <div className="checkbox__style"></div>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;