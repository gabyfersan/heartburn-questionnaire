import React from "react";
import RadioInput from "../RadioInput/RadioInput.tsx";
import "./Question.css";

function Question({ questionObject, answeredId }) {
  return (
    <>
      <h1>{questionObject.question_text}</h1>
      <div className='container'>
        <RadioInput
          label={questionObject.answers[0].label}
          answerId={questionObject.answers[0].id}
          answeredId={answeredId}
        />

        <RadioInput
          label={questionObject.answers[1].label}
          answerId={questionObject.answers[1].id}
          answeredId={answeredId}
        />
      </div>
    </>
  );
}

export default Question;
