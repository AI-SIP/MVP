import React, { useState } from "react";
import "./UserForm.css";

function UserForm({ onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

  const handleSubmit = () => {
    const userInfo = {
      name: name,
      school: school,
    };

    fetch("/userInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onSubmit();
      })
      .catch((error) => {
        console.log(userInfo); // 콘솔에 유저 정보 출력
        onSubmit();
      });
  };

  return (
    <div className="user-form">
      <h1>성함과 학교를 입력해주세요</h1>
      <div className="form-field">
        <label htmlFor="name" className="label">
          이름
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          placeholder="이름 입력"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className="form-field">
        <label htmlFor="school" className="label">
          학교
        </label>
        <input
          type="text"
          id="school"
          className="form-input"
          placeholder="학교 입력"
          onChange={handleSchoolChange}
          value={school}
        />
      </div>
      <div className="form-buttons">
        <button className="back-button" onClick={onBack}>
          뒤로 가기
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          제출
        </button>
      </div>
    </div>
  );
}

export default UserForm;
