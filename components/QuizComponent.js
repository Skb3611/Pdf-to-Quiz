"use client";
import React, { useState, useEffect } from "react";

import { MagicLoader } from "./MagicLoader";
const QuizComponent = ({ data }) => {
 
  
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [Next, setNext] = useState(true);
  const [Submit, setSubmit] = useState(true);
  const [correctOption, setCorrectOption] = useState("");
  const [wrongOption, setWrongOption] = useState("");
  useEffect(() => {
    let i = localStorage.getItem("index")
    if(i) setIndex(i)
  
    }, [])
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    setSubmit(false);
  };

  const handleSubmit = () => {
    const correctAnswer = data[index].answer;
    const selectedAnswer = selected.split(".")[0].toLowerCase();

    if (selectedAnswer === correctAnswer) {
      setCorrectOption(selected);
    } else {
      setWrongOption(selected);
      setCorrectOption(
        data[index].options.find(
          (opt) => opt.split(".")[0].toLowerCase() === correctAnswer
        )
      );
    }
    setNext(false);
    setSubmit(true);
  };

  const handleNext = () => {
    setSubmit(true);
    setNext(true);
    setSelected("");
    setCorrectOption("");
    setWrongOption("");
    setIndex(index + 1);
    let i=1
    localStorage.setItem("index",JSON.stringify(i+index))

  };

  return (
    data && (
      <div>
        <div className=" w-[60%] m-auto shadow-lg shadow-[#b9e5ff] main mt-20 bg-white py-8 px-5 rounded-xl">
          <div className="progressbar flex justify-center gap-5 items-center px-5 mb-5">
            Your Progress
            <div className=" relative size-10 text-sm">
            <MagicLoader index={index} value={(index/data.length)*100}  />
            </div>
            
          </div>
          <div className="Q text-xl text-center mb-10">
            {data[index].question.slice(2)}
          </div>
          <div className="my-3 flex gap-5 justify-center m-auto flex-wrap ">
            {data[index].options.map((option, idx) => {
              let btnClass =
                "w-1/3 text-left bg-[#24aafd] hover:bg-[#0087db] focus:bg-[#0087db] text-white font-bold py-2 px-4 rounded-lg";
              if (
                option.trim().toLowerCase() ===
                correctOption.trim().toLowerCase()
              )
                btnClass =
                  "w-1/3 text-left bg-green-500 text-white font-bold py-2 px-4 rounded-lg";
              if (
                option.trim().toLowerCase() === wrongOption.trim().toLowerCase()
              )
                btnClass =
                  "w-1/3 text-left bg-red-500 text-white font-bold py-2 px-4 rounded-lg";

              return (
                <button
                  onClick={handleClick}
                  key={idx}
                  className={btnClass}
                  disabled={!!correctOption}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="submit flex justify-center my-10 gap-5">
            <button
              type="button"
              disabled={Submit}
              className={`text-white ${
                Submit
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
              } font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2`}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              disabled={Next}
              className={`text-white ${
                Next
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
              } font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2`}
              onClick={handleNext}
            >
              Next
            </button>

          </div>
        </div>
      </div>
    )
  );
};

export default QuizComponent;
