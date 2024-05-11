import React from "react";
import "./Introduction.css";

function IntroductionSecond({ onBack, onSubmit }) {
  return (
    <div className="user-form">
      <h1>문제에 알맞은 보기를 모두 선택해주세요.</h1>
      <h3>부연설명 2</h3>
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

export default IntroductionSecond;
