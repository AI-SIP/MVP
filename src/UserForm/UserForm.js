import React, { useState } from "react";
import "./UserForm.css";
import config from "../config.js";
import { v4 as uuidv4 } from "uuid";

function UserForm({ onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [userId] = useState(() => uuidv4()); // 렌더링 시 한 번만 UUID 생성

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

  const handleSubmit = () => {
    const userInfo = {
      userId: userId,
      name: name,
      school: school,
    };
    console.log(userInfo);
    sessionStorage.setItem("userId", userId);

    fetch(`${config.API_BASE_URL}/userInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("post Success");
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
