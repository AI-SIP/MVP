import React, { useState } from "react";
import "./FeedbackPage.css";
import { FaCheckCircle, FaLock } from "react-icons/fa";

function FeedbackPage({ feedback, index, onNextProblem }) {
  const [showIcons, setShowIcons] = useState(true);

  const renderScoreDiff = () => {
    if (feedback.score_diff > 0) {
      return <span style={{ color: "red" }}>+{feedback.score_diff}</span>;
    } else if (feedback.score_diff < 0) {
      return <span style={{ color: "blue" }}>-{feedback.score_diff}</span>;
    } else {
      return <span style={{ color: "gray" }}>변화 없음</span>;
    }
  };

  const renderPercentageDiff = () => {
    if (feedback.percentage_diff > 0) {
      return <span style={{ color: "red" }}>+{feedback.percentage_diff}%</span>;
    } else if (feedback.score_diff < 0) {
      return (
        <span style={{ color: "blue" }}>-{feedback.percentage_diff}%</span>
      );
    } else {
      return <span style={{ color: "gray" }}>변화 없음</span>;
    }
  };

  const renderIcon = (index) => {
    if (!showIcons) return null;

    const problemNumberNow = index % 3 === 0 ? 3 : index % 3;
    const icons = [];

    for (let i = 0; i < problemNumberNow; i++) {
      icons.push(
        <div className="icon-item">
          <FaCheckCircle
            style={{ color: "green", fontSize: "24px", margin: "5px" }}
          />
        </div>
      );
    }

    for (let i = problemNumberNow; i < 3; i++) {
      icons.push(
        <div className="icon-item">
          <FaLock style={{ color: "blue", fontSize: "24px", margin: "5px" }} />
        </div>
      );
    }

    return <div className="icon-container">{icons}</div>;
  };

  const handleNextClick = () => {
    setShowIcons(false);
    setTimeout(onNextProblem, 100);
  };

  return (
    <div className="feedback-container">
      <h1>{feedback.feedback}</h1>
      {renderIcon(index)}
      <h3>
        현재 점수 : {feedback.score} ({renderScoreDiff()})
      </h3>
      <h3>현재 등급 : {feedback.grade}</h3>
      <h3>
        {feedback.percentage}%의 유저보다 우수한 성적입니다! (
        {renderPercentageDiff()})
      </h3>
      <button onClick={handleNextClick}>다음 문제로</button>
    </div>
  );
}

/*
feedback
{
    "feedback": "정답입니다! 잘하셨어요. 대부분의 학생들도 맞힌 문제예요!",
    "score": 234,
    "percentage": 33.0,
    "grade": 6,
    "score_diff": 92,
    "percentage_diff": 12.0,
    "grade_diff": 0
}
*/

export default FeedbackPage;
