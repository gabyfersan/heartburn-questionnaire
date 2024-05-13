export const getNextquestion = (currentQuestionObject, answeredId) => {
  const nextContainOutcome = !!currentQuestionObject.next.outcome;

  if (nextContainOutcome) {
    return null;
  }
  const foundNextObject = currentQuestionObject.next.find(
    (a) => a.answered === answeredId
  );

  const next_question = foundNextObject
    ? foundNextObject.next_question
    : currentQuestionObject.next[0].next_question;
  return next_question;
};

export const getScore = (currentQuestionObject, answeredId) => {
  const foundAnswersObject = currentQuestionObject.answers.find(
    (a) => a.id === answeredId
  );

  return foundAnswersObject.score;
};
