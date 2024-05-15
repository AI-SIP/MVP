import React, { useState } from "react";
import "./ProblemPage.css";
import config from "../config";

function ProblemPage({ imageUrl, problemId, onNext, subject, userId }) {
  const options = ["ㄱ", "ㄴ", "ㄷ"];
  const [selections, setSelections] = useState([false, false, false]);

  const handleCheckboxChange = (index) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = !updatedSelections[index];
    setSelections(updatedSelections);
  };

  const handleSubmit = () => {
    const realProblemId =
      subject === "earth_science" ? problemId + 10 : problemId;
    console.log("realProblemId : ", realProblemId);
    console.log("userId: ", userId);
    //console.log("subject :", subject === "earth_science");
    fetch(`${config.API_BASE_URL}/problems/${realProblemId}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selections, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("problem feedback : ", data);
        onNext(data); // `onNext`는 피드백을 처리하기 위한 부모 컴포넌트의 함수
      })
      .catch((error) => {
        console.error("Error posting selections:", error);
        let tempFeedback = {
          score: 100,
          percentage: 50,
          rating: 3,
        };
        onNext(tempFeedback);
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
              id={`option-${index}`}
              type="checkbox"
              checked={selected}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={`option-${index}`}>{options[index]}</label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>다음 단계로</button>
    </div>
  );
}

export default ProblemPage;
