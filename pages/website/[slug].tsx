import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';

import { Header, Loader } from '../../components';
import { getQuizzes, getQuizDetails } from '../../services';
import Link from 'next/link'
 
const QuizDetails = ({ quiz }: any) => {
  const router = useRouter();
  if (router.isFallback) {
      return <Loader />
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([] as any);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showBlurb, setShowBlurb] = useState(false);
  
  const handleAnswerOption = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const loadPage = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion+1] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleCheck = () => {
    setShowBlurb(!showBlurb);
  }

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < quiz.questions.length && setCurrentQuestion(nextQues);
    setShowBlurb(!showBlurb);
    loadPage("none")
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      quiz.questions[i].answers.map(
        (answer: any) =>
          answer == quiz.questions[i].correctAnswer &&
          answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };
  return (
    <div className={showScore ? 
      (`flex flex-col w-screen items-end bg-black bg-no-repeat bg-cover bg-center bg-fixed h-screen overflow-hidden`) :  // HAVE TO ADD IN FEATURED IMAGE 
      (`flex flex-col w-screen h-screen overflow-hidden`)} style={{ backgroundColor: `${quiz.mainColor.hex}`}} >
          <Head>
            <title>{ quiz.title }</title>
            <link rel="icon" href={`${quiz.featuredImage.url}`} />
          </Head>
          <style jsx>
              {`
                input[type="radio"]:after {
                  width: 24px;
                  height: 24px;
                  border-radius: 24px;
                  cursor: pointer;
                  position: relative;
                  background-color: ${ quiz.lighterColor.hex };
                  content: "";
                  display: inline-block;
                  visibility: visible;
                  border: 2px solid ${ quiz.accentColor.hex };
                }
                
                input[type="radio"]:checked:after {
                  width: 24px;
                  height: 24px;
                  border-radius: 24px;
                  cursor: pointer;
                  position: relative;
                  background-color: ${ quiz.mainColor.hex };
                  content: "";
                  display: inline-block;
                  visibility: visible;
                  border: 2px solid ${ quiz.accentColor.hex };
                }
              `}
          </style>
        {showScore ? (
        <div className={`flex flex-row w-screen px-5 h-screen justify-center items-start bg-no-repeat bg-cover bg-start bg-fixed`} style={{backgroundImage: `url(${ quiz.featuredImage.url })`}}>
          <div className="text-center py-20">
            <p className="text-3xl font-semibold text-white justify-center">
              Nice Work!
            </p>
            <h1 className="text-3xl font-semibold text-white justify-center">
              You scored {score} out of {quiz.questions.length}
            </h1>           
          </div>
        </div>
        ) : (
          <>{ showBlurb ? (
          <div className={(selectedOptions[currentQuestion].answerByUser === quiz.questions[currentQuestion].correctAnswer)
            ? ("w-screen h-screen justify-center items-center bg-[#A9D49F]") :  
            ("w-screen h-screen justify-center items-center bg-[#FFA6A6]")}>
            <div className="flex flex-col w-screen justify-center items-center pt-10">
              <div className="w-2/3">
                <p className="text-md lg:text-xl text-white">
                {(selectedOptions[currentQuestion].answerByUser === quiz.questions[currentQuestion].correctAnswer)
                  ? ("Correct") :  
                  ("Incorrect")}
                </p>
                <p className="text-md lg:text-2xl m:text-3xl text-white pt-3">
                  {quiz.questions[currentQuestion].question}
                </p>
                <p className="text-sm lg:text-xl m:text-2xl text-white pt-5">
                  Answer: {quiz.questions[currentQuestion].correctAnswer}
                </p>
                <p className="text-sm lg:text-md m:text-xl text-white pt-10 pb-3">
                  {quiz.questions[currentQuestion].blurb}
                </p>
                <button
                  onClick={
                    currentQuestion + 1 === quiz.questions.length
                      ? handleSubmitButton
                      : handleNext
                  }
                  className={(selectedOptions[currentQuestion].answerByUser === quiz.questions[currentQuestion].correctAnswer)
                    ? ("w-[49%] py-3 my-10 bg-[#88d177] rounded-lg text-white") :  
                    ("w-[49%] py-3 my-10 bg-[#fa7373] rounded-lg text-white")}
                  >
                  {
                    currentQuestion + 1 === quiz.questions.length
                      ? "Submit"
                      : "Next"
                  }
                </button>
              </div>
            </div>
          </div>
          ) : (
          <div className="flex flex-col lg:flex-row justify-start w-screen pb-10">
            <div className="w-screen lg:w-[60%] px-5 h-1/2 justify-center items-center">
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-white/60">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </h4>
                <div className="mt-4 text-2xl text-white">
                    {quiz.questions[currentQuestion].question}
                </div>
              </div>
              <div className="flex flex-col w-full">
                {quiz.questions[currentQuestion].answers.map((answer: any, index: any) => (
                  <div
                    key={index}
                    style={{ backgroundColor: `${quiz.lighterColor.hex}`}}
                    className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-black/10 rounded-xl" 
                    onClick={(e) => handleAnswerOption(answer)}
                  >
                    <input
                      type="radio"
                      name={answer}
                      value={answer}
                      checked={
                        answer ===
                        selectedOptions[currentQuestion]?.answerByUser
                      }
                      onChange={(e) => handleAnswerOption(answer)}
                      className="w-6 h-6 bg-black" 
                      style={{backgroundColor: "green"}}
                    //   style={(answer === selectedOptions[currentQuestion]?.answerByUser) ? { backgroundColor: `${quiz.mainColor.hex}`} : { backgroundColor: `${quiz.lighterColor.hex}`}}
                    />
                    <p className="ml-6 text-white">{answer}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-between w-full mt-4 text-white">
                <button
                  onClick={handleCheck}
                  className="w-[40%] h-1/4 py-3 rounded-lg left"
                  style={{ backgroundColor: `${quiz.accentColor.hex}`}}
                >
                  {currentQuestion + 1 === quiz.questions.length ? "Submit" : "Check"}
                </button>
                <div className="relative px-5 justify-start items-start mb-10 lg:hidden">
                  <img 
                    src={quiz.questions[currentQuestion].graphic.url} 
                    alt={quiz.questions[currentQuestion].question}
                    className='h-80'
                  />
                  {quiz.graphicsAuthors.map((author : any) => (
                    <p className={`text-sm justify-self-end absolute`} style={{ color: `${quiz.lighterColor.hex}`}}>
                      {author.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
              <div className="hidden lg:visible lg:flex h-[80%] justify-center items-center">
                  <img 
                    src={quiz.questions[currentQuestion].graphic.url} 
                    alt={quiz.questions[currentQuestion].question}
                    className='h-[80%]'
                  />
               </div>
          </div>
          )}</>
        )}
    </div>
  );
}

export default QuizDetails

export async function getStaticProps({ params }: any) {
    const data = (await getQuizDetails(params.slug));

    
  
    return {
      props: { quiz: data }
    }
}

export async function getStaticPaths() {
    const quizzes = await getQuizzes()

    return {
        paths: quizzes.map(({ node: { slug }}: any) => ({ params: { slug }})),
        fallback: true,
    }
}