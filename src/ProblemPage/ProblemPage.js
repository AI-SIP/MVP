import React, { useState } from "react";
import "./ProblemPage.css";

function ProblemPage({ imageUrl, problemId, onNext }) {
  const options = ["ㄱ", "ㄴ", "ㄷ"];
  const [selections, setSelections] = useState([false, false, false]);

  const handleCheckboxChange = (index) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = !updatedSelections[index];
    setSelections(updatedSelections);
  };

  const handleSubmit = () => {
    fetch(`/problem/${problemId}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selections }),
    })
      .then((response) => response.json())
      .then((data) => {
        onNext(data.feedback); // `onNext`는 피드백을 처리하기 위한 부모 컴포넌트의 함수
      })
      .catch((error) => {
        console.error("Error posting selections:", error);
        onNext("피드백.");
      })
      .finally(() => {
        console.log(selections);
      });
  };

  return (
    <div className="problem-container">
      <h1>{problemId}번 문제</h1>
      <img src={imageUrl} alt="Problem" />
      <div className="options-container">
        {selections.map((selected, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleCheckboxChange(index)}
            />
            <label>{`${options[index]}`}</label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>다음 단계로</button>
    </div>
  );
}

export default ProblemPage;
