import React, { useEffect, useState } from "react";
import config from "../config";

function AnalysisPage({ onSubmit }) {
  const [analysisResult, setAnalysisResult] = useState("");

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/problems/analysis`)
      .then((response) => response.json())
      .then((data) => {
        console.log("analysis: ", data);
        setAnalysisResult(data.result); // 백엔드에서 "result" 필드를 사용한다고 가정
      })
      .catch((error) => {
        setAnalysisResult("분석 결과.");
      });
  }, []);

  return (
    <div className="analysis-container">
      <h1>최종 분석 결과</h1>
      <p>{analysisResult}</p>
      <button onClick={onSubmit}>마침</button>
    </div>
  );
}

export default AnalysisPage;
