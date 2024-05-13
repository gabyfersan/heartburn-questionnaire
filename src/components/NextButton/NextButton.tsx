import "./NextButton.css";

function NextButton({ answerId }) {
  return (
    <>
      <button
        className={`next next-button  ${
          !answerId ? "answer-not-selected" : ""
        }`}
      >
        {console.log("answerId", answerId)}
        Next
        <span className='next material-symbols-outlined'>chevron_right</span>
      </button>
    </>
  );
}

export default NextButton;
