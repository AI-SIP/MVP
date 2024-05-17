import React, { useState } from "react";
import "./ReviewPage.css";
import config from "../config.js";

function ReviewPage({ onSubmit, userId }) {
  // useState를 사용하여 리뷰 내용을 저장할 상태 변수를 생성합니다.
  const [reviewText, setReviewText] = useState("");

  // 사용자가 입력 필드에 입력할 때마다 리뷰 내용을 업데이트합니다.
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`${config.API_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, review: reviewText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("post Success: ", data);
        onSubmit();
      })
      .catch((error) => {
        console.log("review submit error: ", error);
        onSubmit();
      });
  };

  return (
    <div className="review-form">
      <h3>여러분의 리뷰는 저희 프로젝트 개선에 큰 도움이 됩니다.</h3>
      <h3>
        소중한 리뷰 하나하나 정성껏 읽고 개선할 수 있도록 노력하겠습니다.
        감사합니다.
      </h3>
      <textarea
        value={reviewText}
        onChange={handleReviewChange}
        placeholder="여기에 리뷰를 작성해주세요!"
        rows="10"
        cols="33"
      ></textarea>
      <button onClick={handleSubmit}>제출하기</button>
    </div>
  );
}

export default ReviewPage;
