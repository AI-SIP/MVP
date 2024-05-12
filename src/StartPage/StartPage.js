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
  return <p>안녕하세용</p>;
}

function ConfirmButton({ onConfirm }) {
  return <button onClick={onConfirm}>다음</button>;
}

export default StartPage;
