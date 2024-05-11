import React from "react";
import "./Introduction.css";

function IntroductionFirst({ onBack, onSubmit }) {
  return (
    <div className="user-form">
      <h1>문제는 총 3문항으로 구성되어 있습니다.</h1>
      <h3>부연설명 1</h3>
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
