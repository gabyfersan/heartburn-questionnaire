import React, { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import NextButton from "../NextButton/NextButton.tsx";
import Question from "../Question/Question.tsx";
import "./Questionnaire.css";

function Questionnaire() {
  const [count, setCount] = useState(0);
  const [heartburnQuestions, setHeartburnQuestions] = useState({});
  const [heartburnOutcomes, setHeartburnOutcomes] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [currentQuestionObject, setCurrentQuestionObject] = useState({});
  const [answeredId, setAnsweredId] = useState("");
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const { isLoading, data, error } = useFetch(
    "https://gist.githubusercontent.com/johanlunds/aad03ac7d0f0bcfb95c80584cd4cbdd7/raw/heartburn.json"
  );

  useEffect(() => {
    setCurrentQuestionObject(heartburnQuestions[currentQuestionId]);
    console.log(
      "currentQuestionId",
      currentQuestionId,
      heartburnQuestions[currentQuestionId],
      heartburnQuestions
    );
  }, [currentQuestionId]);

  useEffect(() => {
    if (data) {
      const convertedObject = {};
      setHeartburnOutcomes(data.outcomes);
      //setCurrentQuestionId(data.questions[0].id);
      //setCurrentQuestionId("heartburn_weekly_sleep");
      setCurrentQuestionId("is_heartburn_known");

      data.questions.forEach((question) => {
        convertedObject[question.id] = question;
      });
      setHeartburnQuestions(convertedObject);
    }
  }, [data]);

  const handleOptionClick = (target) => {
    if (target.target.name === "answer") {
      setAnsweredId(target.target.getAttribute("data-answer-id"));
      setNextButtonClicked(false);
    }
    if (target.target.className.includes("next")) {
      if (answeredId) {
        const foundNextObject = currentQuestionObject.next.find(
          (a) => a.answered == answeredId
        );
        setAnsweredId("");
        setCurrentQuestionId(
          foundNextObject
            ? foundNextObject.next_question
            : currentQuestionObject.next[0].next_question
        );
      } else {
        setNextButtonClicked(true);
      }
    }
  };
  return (
    <section className='container-questionnaire' onClick={handleOptionClick}>
      {isLoading && <span>Loading</span>}
      {error && <span>Error</span>}

      {currentQuestionObject?.id && (
        <Question questionObject={currentQuestionObject}  answeredId={answeredId} />
      )}
      <NextButton answeredId={answeredId} />
      {!answeredId && nextButtonClicked && (
        <span style={{ color: "red" }}>Please choice one answer above</span>
      )}
    </section>
  );
}

export default Questionnaire;
