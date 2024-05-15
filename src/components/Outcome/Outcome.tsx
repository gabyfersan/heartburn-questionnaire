import React from "react";
import "./Outcome.css";

function Outcome({ outcomesText, showBookingAMeeting, resetQuestionnaire }) {
  const handleClick = () => {
    resetQuestionnaire();
  };

  return (
    <>
      <h1>Thank you for answering the questions!</h1>
      <span className='text'>{outcomesText}</span>
      {showBookingAMeeting && (
        <button className='book-a-meeting'>
          Book a meeting
          <span className='next material-symbols-outlined'>chevron_right</span>
        </button>
      )}
      <button onClick={handleClick} className='back-to-start'>
        Back to the start screen
      </button>
    </>
  );
}

export default Outcome;
