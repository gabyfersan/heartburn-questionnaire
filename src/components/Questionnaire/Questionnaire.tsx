import React, { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import NextButton from "../NextButton/NextButton.tsx";
import Outcome from "../Outcome/Outcome.tsx";
import Question from "../Question/Question.tsx";
import "./Questionnaire.css";
import {
  convertObject,
  getNextquestion,
  getOutcome,
  getScore,
  isLastQuestion,
} from "./helperFunctions.js";

function Questionnaire() {
  const [score, setScore] = useState(0);
  const [heartburnQuestions, setHeartburnQuestions] = useState({});
  const [heartburnOutcomes, setHeartburnOutcomes] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [outcome, setOutcome] = useState("");
  const [currentQuestionObject, setCurrentQuestionObject] = useState({});
  const [answeredId, setAnsweredId] = useState("");
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [showQuestionAndNextButton, setShowQuestionAndNextButton] =
    useState(true);

  const { isLoading, data, error } = useFetch(
    "https://gist.githubusercontent.com/johanlunds/aad03ac7d0f0bcfb95c80584cd4cbdd7/raw/heartburn.json"
  );

  useEffect(() => {
    setCurrentQuestionObject(heartburnQuestions[currentQuestionId]);
  }, [currentQuestionId, heartburnQuestions]);

  useEffect(() => {
    if (data) {
      setHeartburnOutcomes(convertObject(data, "outcomes"));
      setCurrentQuestionId("is_heartburn_known");
      // const convertedObject = {};
      // data.questions.forEach((question) => {
      //   convertedObject[question.id] = question;
      // });

      setHeartburnQuestions(convertObject(data, "questions"));
    }
  }, [data]);

  const handleOptionClick = (target) => {
    if (target.target.name === "answer") {
      setAnsweredId(target.target.getAttribute("data-answer-id"));
      setNextButtonClicked(false);
    }
    if (target.target.className.includes("next")) {
      if (answeredId) {
        const currentScore = getScore(currentQuestionObject, answeredId);
        setScore((prev) => prev + currentScore);
        if (isLastQuestion(currentQuestionObject)) {
          setShowQuestionAndNextButton(false);
          setOutcome(getOutcome(currentQuestionObject, score));
        } else {
          const nextQuestion = getNextquestion(
            currentQuestionObject,
            answeredId
          );
          setAnsweredId("");
          setCurrentQuestionId(nextQuestion);
        }
      } else {
        setNextButtonClicked(true);
      }
    }
  };
  return (
    <section className='container-questionnaire' onClick={handleOptionClick}>
      {score}
      {isLoading && <span>Loading</span>}
      {error && <span>Error</span>}

      {currentQuestionObject?.id && showQuestionAndNextButton && (
        <Question
          questionObject={currentQuestionObject}
          answeredId={answeredId}
        />
      )}
      {showQuestionAndNextButton && <NextButton answeredId={answeredId} />}
      {!showQuestionAndNextButton && (
        <Outcome
          outcomesText={heartburnOutcomes[outcome].text}
          showBookingAMeeting={heartburnOutcomes[outcome].show_booking_button}
        />
      )}
      {!answeredId && nextButtonClicked && (
        <span style={{ color: "red" }}>Please choice one answer above</span>
      )}
    </section>
  );
}

export default Questionnaire;
