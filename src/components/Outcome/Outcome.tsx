import React from "react";
import "./Outcome.css";

function Outcome({ outcomesText, showBookingAMeeting }) {
  return (
    <>
      <h1>Thank you for answering the questions!</h1>
      <span className='container'>{outcomesText}</span>
      {showBookingAMeeting && (
        <button>
          Book a meeting
          <span className='next material-symbols-outlined'>chevron_right</span>
        </button>
      )}
    </>
  );
}

export default Outcome;
