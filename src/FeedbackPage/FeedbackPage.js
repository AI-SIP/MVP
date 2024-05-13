import React from "react";
import "./FeedbackPage.css";

function FeedbackPage({ feedback, index, onNextProblem }) {
  return (
    <div className="feedback-container">
      <h1>상위 {feedback.percentage}%의 유저보다 우수한 성적입니다!</h1>
      <h3>현재 점수 : {feedback.score}</h3>
      <h3>현재 등급 : {feedback.rating}</h3>
      <button onClick={onNextProblem}>다음 문제로</button>
    </div>
  );
}

export default FeedbackPage;
