import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckboxClick, checkbox }) {

  return (
    <label className="checkbox">
      <input className="checkbox__input" checked={checkbox} type="checkbox" onChange={handleCheckboxClick}/>
      <div className="checkbox__style"></div>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;