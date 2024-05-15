import React from "react";
import "./StartPage.css";

function StartPage({ onConfirm }) {
  return (
    <div className="container">
      <Header />
      <Message />
      <ConfirmButton onConfirm={onConfirm} />
    </div>
  );
}

function Header() {
  return <h1>AI-SIP's Project</h1>;
}

function Message() {
  return <h3>경쟁형 메타인지 과학 학습 플랫폼 - 과탑</h3>;
}

function ConfirmButton({ onConfirm }) {
  return <button onClick={onConfirm}>다음</button>;
}

export default StartPage;
