import React, { useState } from "react";
import questions from "../src/questions/questions";
import ProgressBar from "@ramonak/react-progress-bar";
import CustomButton from "./components/CustomButton";
import StarRating from "./components/StarRating";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(false);
  const [mcq, setMcq] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const showStatus = () => {
    if (showNextQuestion) {
      if (result) {
        return "Correct!";
      } else {
        return "Sorry! Wrong Answer.";
      }
    }
  };

  const changeQuestionIndex = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <>
      <ProgressBar
        completed={((currentQuestion + 1) / questions.length).toFixed(2) * 100}
        isLabelVisible={false}
      />

      <div className="App">
        <div className="App-center">
          <div className="question-header">
            <h4>
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <span>{questions[currentQuestion]?.category}</span>
            <StarRating diff={currentQuestion} />
          </div>
          <div className="ques">
            <p>{questions[currentQuestion]?.question}</p>
          </div>

          <div className="answers-buttons-styles">
            <div className="btn-row">
              <button
                className={mcq ? "disable-cursor" : "answers-style1"}
                disabled={mcq}
                style={{
                  backgroundColor: mcq && "#00ffbf",
                  color: mcq && "black",
                }}
                onClick={() => {
                  setMcq(true);
                  setShowNextQuestion(true);
                  setResult(true);
                }}
              >
                {questions[currentQuestion]?.correct_answer}
              </button>
            </div>

            {questions[currentQuestion]?.incorrect_answers?.map(
              (ques, index, self) => {
                return (
                  <div className="btn-row" key={ques}>
                    <button
                      disabled={mcq}
                      style={{
                        borderColor: index === selectedAnswer && "red",
                      }}
                      className={mcq ? "disable-cursor" : "answers-style"}
                      onClick={() => {
                        setSelectedAnswer(index);
                        setMcq(true);
                        setShowNextQuestion(true);
                        setResult(false);
                      }}
                    >
                      {ques}
                    </button>
                  </div>
                );
              }
            )}
          </div>
          <div className="question-result">
            <span>{showStatus()}</span>
          </div>

          {showNextQuestion && (
            <div className="next-question">
              <CustomButton
                qIndex={currentQuestion}
                onClick={() => {
                  setMcq(false);
                  changeQuestionIndex();
                  setShowNextQuestion(false);
                  setSelectedAnswer(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
