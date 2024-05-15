import "./RadioInput.css";

function RadioInput({ label, answerId, answeredId }) {
  return (
    <>
      <label className='container-radio-button'>
        {label}
        <input type='radio' name='answer' data-answer-id={answerId} />
        {answerId === answeredId ? (
          <span className='checkmark material-symbols-outlined'>
            check_circle
          </span>
        ) : (
          <span></span>
        )}
      </label>
    </>
  );
}

export default RadioInput;
