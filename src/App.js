import React, { useState } from "react";
import "./App.css";
import StartPage from "./StartPage/StartPage";
import IntroductionFirst from "./Introduction/IntroductionFirst";
import IntroductionSecond from "./Introduction/IntroductionSecond";
import UserForm from "./UserForm/UserForm";
import SubjectSelection from "./SubjectSelection/SubjectSelection";
import ProblemSetStartPage from "./ProblemSetStartPage/ProblemSetStartPage";
import ProblemPage from "./ProblemPage/ProblemPage";
import FeedbackPage from "./FeedbackPage/FeedbackPage";
import AnalysisPage from "./Analysis/AnalysisPage";
import { CSSTransition } from "react-transition-group";
import config from "./config";

function App() {
  const problemSetSize = 3;
  const [currentScreen, setCurrentScreen] = useState("startPage"); // 초기 상태를 startPage로 설정
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState("이 문제에 대한 피드백입니다...");
  const [subject, setSubject] = useState("");

  const handleToStartPage = () => {
    setImageIndex(0);
    changeScreenWithDelay("startPage");
  };

  const handleToIntroductionFirstPage = () => {
    changeScreenWithDelay("introduction1");
  };

  const handleToIntroductionSecondPage = () => {
    changeScreenWithDelay("introduction2");
  };

  const handleToUserFormPage = () => {
    changeScreenWithDelay("userForm");
  };

  const handleToSubjectSelectPage = () => {
    changeScreenWithDelay("subjectSelection"); // UserForm에서 제출 버튼 클릭 시 화면 전환
  };

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
    fetch(`${config.API_BASE_URL}/problems/${subject}`)
      .then((response) => response.json())
      .then((data) => {
        // 모든 키의 값(이미지 URL 배열)을 하나의 배열로 합치기
        const allImages = Object.values(data).flat();
        console.log(allImages);
        setImages(allImages); // 추출된 모든 이미지 URL을 상태에 저장
        changeScreenWithDelay("problemSetStartPage");
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
        let tempImages = [
          "/images/problem1.png",
          "/images/problem2.png",
          "/images/problem3.png",
          "/images/problem4.png",
          "/images/problem5.png",
          "/images/problem6.png",
          "/images/problem7.png",
          "/images/problem8.png",
          "/images/problem9.png",
        ];
        setImages(tempImages);
        changeScreenWithDelay("problemSetStartPage");
      });
  };

  const handleNextProblem = () => {
    const nextIndex = imageIndex + 1;
    setImageIndex(nextIndex);
    if (nextIndex < images.length) {
      if (nextIndex % problemSetSize === 0) {
        changeScreenWithDelay("problemSetStartPage");
      } else {
        changeScreenWithDelay("problemPage");
      }
    } else {
      console.log("No more problems");
      handleToAnalysis();
    }
  };

  const handleToProblem = () => {
    changeScreenWithDelay("problemPage");
  };

  const handleFeedback = (feedbackFromServer) => {
    setFeedback(feedbackFromServer);
    changeScreenWithDelay("feedbackPage");
  };

  const handleToAnalysis = () => {
    changeScreenWithDelay("analysisPage"); // 분석 페이지로 전환
  };

  const changeScreenWithDelay = (newScreen) => {
    setCurrentScreen(null);
    setTimeout(() => {
      setCurrentScreen(newScreen);
    }, 500);
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
        in={currentScreen === "problemSetStartPage"}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <ProblemSetStartPage
          problemSetNumber={Math.floor(imageIndex / problemSetSize) + 1}
          onNextProblem={handleToProblem}
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
          subject={subject}
          userId={sessionStorage.getItem("userId")}
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
        <AnalysisPage onSubmit={handleToStartPage} />
      </CSSTransition>
    </div>
  );
}

export default App;
