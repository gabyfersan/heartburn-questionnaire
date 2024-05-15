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
  isNextButtonClicked,
  isOptionButtonClicked,
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
      setHeartburnQuestions(convertObject(data, "questions"));
    }
  }, [data]);

  const resetQuestionnaire = () => {
    setCurrentQuestionId("is_heartburn_known");
    setScore(0);
    setShowQuestionAndNextButton(true);
    setNextButtonClicked(false);
    setAnsweredId("");
  };

  const handleOptionClick = (target) => {
    if (isOptionButtonClicked(target)) {
      setAnsweredId(target.target.getAttribute("data-answer-id"));
      setNextButtonClicked(false);
    }

    if (isNextButtonClicked(target)) {
      if (!answeredId) {
        setNextButtonClicked(true);
        return;
      }

      const currentScore = getScore(currentQuestionObject, answeredId);
      setScore((prev) => prev + currentScore);
      if (isLastQuestion(currentQuestionObject)) {
        setShowQuestionAndNextButton(false);
        setOutcome(getOutcome(currentQuestionObject, score));
        return;
      }
      const nextQuestion = getNextquestion(currentQuestionObject, answeredId);
      setAnsweredId("");
      setCurrentQuestionId(nextQuestion);
    }
  };
  return (
    <section className='container-questionnaire' onClick={handleOptionClick}>
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
          resetQuestionnaire={resetQuestionnaire}
        />
      )}
      {!answeredId && nextButtonClicked && (
        <span style={{ color: "red" }}>Please choice one answer above</span>
      )}
    </section>
  );
}

export default Questionnaire;
