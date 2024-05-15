import "./NextButton.css";

function NextButton({ answeredId }) {
  return (
    <>
      <button
        className={`next next-button  ${
          !answeredId ? "answer-not-selected" : ""
        }`}
      >
        Next
        <span className='next material-symbols-outlined'>chevron_right</span>
      </button>
    </>
  );
}

export default NextButton;
