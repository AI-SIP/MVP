import React from "react";
import "./ProblemSetStartPage.css";

function ProblemSetStartPage({ problemSetNumber, onNextProblem }) {
  let a, b;

  if (problemSetNumber === 1) {
    a = 80;
    b = 100;
  } else if (problemSetNumber === 2) {
    a = 60;
    b = 80;
  } else if (problemSetNumber === 3) {
    a = 0;
    b = 60;
  }

  return (
    <div className="feedback-container">
      <h1>{problemSetNumber}번째 세트 입니다.</h1>
      <h3>
        {problemSetNumber}번째 세트는 정답률 {a}% ~ {b}%의 문제들로 구성되어
        있습니다.
      </h3>
      <button onClick={onNextProblem}>다음 문제로</button>
    </div>
  );
}

export default ProblemSetStartPage;
