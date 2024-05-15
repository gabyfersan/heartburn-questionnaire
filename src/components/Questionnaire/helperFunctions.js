export const getNextquestion = (currentQuestionObject, answeredId) => {
  if (isLastQuestion(currentQuestionObject)) {
    return null;
  }
  const foundNextObject = currentQuestionObject.next.find(
    (next) => next.answered === answeredId
  );

  const next_question = foundNextObject
    ? foundNextObject.next_question
    : currentQuestionObject.next[0].next_question;
  return next_question;
};

export const getOutcome = (currentQuestionObject, score) => {
  const foundoutcome = currentQuestionObject.next.find(
    (next) => score <= next.max_score
  );

  return foundoutcome
    ? foundoutcome.outcome
    : currentQuestionObject.next[2].outcome;
};

export const getScore = (currentQuestionObject, answeredId) => {
  const foundAnswersObject = currentQuestionObject.answers.find(
    (answer) => answer.id === answeredId
  );

  return foundAnswersObject.score;
};

export const isLastQuestion = (currentQuestionObject) =>
  !!currentQuestionObject.next[0].outcome;

export const convertObject = (data, key) => {
  const convertedObject = {};
  data[key].forEach((obeject) => {
    convertedObject[obeject.id] = obeject;
  });
  return convertedObject;
};

export const isOptionButtonClicked = (target) =>
  target.target.name === "answer";

export const isNextButtonClicked = (target) =>
  target.target.className.includes("next");
