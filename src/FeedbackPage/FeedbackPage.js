import React from "react";

function FeedbackPage({ feedback, index, onNextProblem }) {
  return (
    <div className="feedback-container">
      <h1>{index}번 문제 피드백</h1>
      <p>{feedback}</p>
      <button onClick={onNextProblem}>다음 문제로</button>
    </div>
  );
}

export default FeedbackPage;
