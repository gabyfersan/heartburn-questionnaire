import { useState } from "react";
import "./RadioInput.css";

function RadioButton({ label, answerId }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <label className='container-radio-button'>
        {label}
        <input type='radio' name='answer' data-answer-id={answerId} />
        <span className=' checkmark material-symbols-outlined'>
          check_circle
        </span>
      </label>
    </>
  );
}

export default RadioButton;
