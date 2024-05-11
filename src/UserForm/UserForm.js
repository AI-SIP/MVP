import React from "react";
import "./UserForm.css";

function UserForm({ onBack, onSubmit }) {
  return (
    <div className="user-form">
      <h1>성함, 학교를 입력해주세요</h1>
      <input type="text" placeholder="이름 입력" className="form-input" />
      <input type="text" placeholder="학교 입력" className="form-input" />
      <div className="form-buttons">
        <button className="back-button" onClick={onBack}>
          뒤로 가기
        </button>
        <button className="submit-button" onClick={onSubmit}>
          제출
        </button>
      </div>
    </div>
  );
}

export default UserForm;
