import React from "react";

function LastPage({ onSubmit }) {
  return (
    <div className="container">
      <h1>감사합니다!!!</h1>
      <button onClick={onSubmit}>홈으로 돌아가기</button>
    </div>
  );
}

export default LastPage;
