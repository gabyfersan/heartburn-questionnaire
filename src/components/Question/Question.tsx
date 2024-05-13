import { useState } from "react";
import RadioButton from "../RadioInput/RadioInput.tsx";
import "./Question.css";

function Question({ questionObject }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{questionObject.question_text}</h1>
      <div className='container'>
        <RadioButton
          label={questionObject.answers[0].label}
          answerId={questionObject.answers[0].id}
        />

        <RadioButton
          label={questionObject.answers[1].label}
          answerId={questionObject.answers[1].id}
        />
      </div>
    </>
  );
}

export default Question;
