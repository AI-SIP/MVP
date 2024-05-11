import React, { useState } from "react";
import "./App.css";
import StartPage from "./StartPage/StartPage";
import IntroductionFirst from "./Introduction/IntroductionFirst";
import IntroductionSecond from "./Introduction/IntroductionSecond";
import UserForm from "./UserForm/UserForm";
import SubjectSelection from "./SubjectSelection/SubjectSelection";
import ProblemPage from "./ProblemPage/ProblemPage";
import FeedbackPage from "./FeedbackPage/FeedbackPage";
import AnalysisPage from "./Analysis/AnalysisPage";
import { CSSTransition } from "react-transition-group";

function App() {
  const [currentScreen, setCurrentScreen] = useState("startPage"); // 초기 상태를 startPage로 설정
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState("이 문제에 대한 피드백입니다...");

  const handleToStartPage = () => {
    setCurrentScreen("startPage");
  };

  const handleToIntroductionFirstPage = () => {
    setCurrentScreen("introduction1");
  };

  const handleToIntroductionSecondPage = () => {
    setCurrentScreen("introduction2");
  };

  const handleToUserFormPage = () => {
    setCurrentScreen("userForm");
  };

  const handleToSubjectSelectPage = () => {
    setCurrentScreen("subjectSelection"); // UserForm에서 제출 버튼 클릭 시 화면 전환
  };

  const handleSubjectSelect = (subject) => {
    fetch(`/problems/${subject}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 서버 응답 로그 출력
        setImages(data.map((item) => item.imageUrl)); // 이미지 URL만 추출하여 상태에 저장
        setCurrentScreen("problemPage");
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
        let tempImages = [
          "/images/problem1.png",
          "/images/problem2.png",
          "/images/problem3.png",
        ];
        setImages(tempImages);
        setCurrentScreen("problemPage");
      });
  };

  const handleNextProblem = () => {
    const nextIndex = imageIndex + 1;
    if (nextIndex < images.length) {
      setImageIndex(nextIndex);
      setCurrentScreen("problemPage");
    } else {
      console.log("No more problems");
      handleToAnalysis();
    }
  };

  const handleFeedback = (feedbackFromServer) => {
    setFeedback(feedbackFromServer);
    setCurrentScreen("feedbackPage");
  };

  const handleToAnalysis = () => {
    setCurrentScreen("analysisPage"); // 분석 페이지로 전환
  };

  return (
    <div className="container">
      <CSSTransition
        in={currentScreen === "startPage"}
        timeout={100}
        classNames="fade"
        unmountOnExit
        onExited={() => {}}
      >
        <StartPage onConfirm={handleToIntroductionFirstPage} />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "introduction1"}
        timeout={100}
        classNames="fade"
        unmountOnExit
        onExited={() => {}}
      >
        <IntroductionFirst
          onBack={handleToStartPage}
          onSubmit={handleToIntroductionSecondPage}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "introduction2"}
        timeout={100}
        classNames="fade"
        unmountOnExit
        onExited={() => {}}
      >
        <IntroductionSecond
          onBack={handleToIntroductionFirstPage}
          onSubmit={handleToUserFormPage}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "userForm"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <UserForm
          onBack={handleToIntroductionSecondPage}
          onSubmit={handleToSubjectSelectPage}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "subjectSelection"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <SubjectSelection
          onSelect={handleSubjectSelect}
          onBack={handleToUserFormPage}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "problemPage"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <ProblemPage
          imageUrl={images[imageIndex]}
          problemId={imageIndex + 1}
          onNext={handleFeedback}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "feedbackPage"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <FeedbackPage
          feedback={feedback}
          index={imageIndex + 1}
          onNextProblem={handleNextProblem}
        />
      </CSSTransition>

      <CSSTransition
        in={currentScreen === "analysisPage"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <AnalysisPage />
      </CSSTransition>
    </div>
  );
}

export default App;
