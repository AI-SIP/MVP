import React from "react";
import "./Introduction.css";

function IntroductionFirst({ onBack, onSubmit }) {
  return (
    <div className="user-form">
      <h1>문제는 총 3개의 세트로 구성되어 있습니다.</h1>
      <h3>
        각 세트는 3개의 문항으로 구성되어 총 9개의 문제를 응시하시면 됩니다.
      </h3>
      <div className="form-buttons">
        <button className="back-button" onClick={onBack}>
          뒤로 가기
        </button>
        <button className="submit-button" onClick={onSubmit}>
          다음
        </button>
      </div>
    </div>
  );
}

export default IntroductionFirst;
