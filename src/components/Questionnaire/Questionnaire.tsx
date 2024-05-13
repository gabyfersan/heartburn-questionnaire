import React, { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import NextButton from "../NextButton/NextButton.tsx";
import Question from "../Question/Question.tsx";
import "./Questionnaire.css";

function Questionnaire() {
  const [count, setCount] = useState(0);
  const [heartburnQuestions, setHeartburnQuestions] = useState({});
  const [heartburnOutcomes, setHeartburnOutcomes] = useState({});
  const [nextQuestionId, setNextQuestionId] = useState("");
  const [nextQuestionObject, setNextQuestionObject] = useState({});
  const [answerId, setAnswerId] = useState("");
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const { isLoading, data, error } = useFetch(
    "https://gist.githubusercontent.com/johanlunds/aad03ac7d0f0bcfb95c80584cd4cbdd7/raw/heartburn.json"
  );

  useEffect(() => {
    setNextQuestionObject(heartburnQuestions[nextQuestionId]);
    console.log(
      "nextQuestionId",
      nextQuestionId,
      heartburnQuestions[nextQuestionId],
      heartburnQuestions
    );
  }, [nextQuestionId]);

  useEffect(() => {
    if (data) {
      const convertedObject = {};
      setHeartburnOutcomes(data.outcomes);
      //setNextQuestionId(data.questions[0].id);
      setNextQuestionId("heartburn_weekly_sleep");

      data.questions.forEach((question) => {
        convertedObject[question.id] = question;
      });
      setHeartburnQuestions(convertedObject);
      //console.log(convertedObject);
      //setHeartburnQuestion;
    }
  }, [data]);

  //useEffect(() => {}, [nextButtonClicked]);

  const handleOptionClick = (target) => {
    if (target.target.name === "answer") {
      setAnswerId(target.target.getAttribute("data-answer-id"));
      setNextButtonClicked(false);
    }
    if (target.target.className.includes("next")) {
      setNextButtonClicked(true);
      if (answerId) {
        setNextQuestionId(answerId);
      }
    }
  };
  return (
    <section className='container-questionnaire' onClick={handleOptionClick}>
      {isLoading && <span>Loading</span>}
      {error && <span>Error</span>}

      {nextQuestionObject?.id && (
        <Question questionObject={nextQuestionObject} />
      )}
      <NextButton answerId={answerId} />
      {!answerId && nextButtonClicked && (
        <span style={{ color: "red" }}>Please choice one answer above</span>
      )}
    </section>
  );
}

export default Questionnaire;
