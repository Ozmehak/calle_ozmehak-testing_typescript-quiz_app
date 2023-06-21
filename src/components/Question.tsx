import React, { useState, useEffect, useContext } from 'react'
import { GameStateCtx, QuestionCtx, ScoreCtx } from '../ctx/Context'
import { gameConfig } from '../utils/GameConfig'
import { shuffle, calculateScore } from '../utils/Utils'

export const Question = () => {
  const {
    setScore,
    round,
    setRound,
    correctAnswers,
    setCorrectAnswers,
    consecutiveCorrectAnswers,
    setConsecutiveCorrectAnswers,
    consecutiveBonus,
    setConsecutiveBonus,
    totalRemainingTime,
    setTotalRemainingTime,
    difficultyMultiplier,
  } = useContext(ScoreCtx)
  const { setChangeGameState } = useContext(GameStateCtx)
  const { category, difficulty, region } = useContext(QuestionCtx)
  const [question, setQuestion] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [answers, setAnswers] = useState<any>([])
  const [fastCount, setFastCount] = useState<number>(3)
  const [slowCount, setSlowCount] = useState<number>(gameConfig.timePerQuestion)
  const [fastTimerOn, setFastTimerOn] = useState<boolean>(true)
  const [slowTimerOn, setSlowTimerOn] = useState<boolean>(false)

  const handleAnswer = (e: any) => {
    setRound(round + 1)
    setSlowTimerOn(false)
    setChangeGameState('selectCategory')

    if (e === question.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1)
      setConsecutiveCorrectAnswers(consecutiveCorrectAnswers + 1)
      setTotalRemainingTime(Math.floor(totalRemainingTime + slowCount))
    } else {
      setConsecutiveCorrectAnswers(0)
    }
  }

  useEffect(() => {
    if (consecutiveCorrectAnswers >= 3 && consecutiveCorrectAnswers >= consecutiveBonus) {
      setConsecutiveBonus(consecutiveCorrectAnswers)
    }
  }, [consecutiveCorrectAnswers, setConsecutiveBonus, consecutiveBonus])
  useEffect(() => {
    const getQuizQuestion = async () => {
      try {
        return fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}&region=${region}`)
          .then((res) => res.json())
          .then((json) => setQuestion(json[0]))
      } catch (error) {
        console.error(error)
      }
    }
    getQuizQuestion()
  }, [category, difficulty, region])

  useEffect(() => {
    if (question) {
      setAnswers(shuffle(question.incorrectAnswers, question.correctAnswer))
    }
  }, [question])

  useEffect(() => {
    let intervalFast: NodeJS.Timeout | null = null
    let intervalSlow: NodeJS.Timeout | null = null

    if (fastTimerOn) {
      intervalFast = setInterval(() => {
        setFastCount((prevFastCount) => prevFastCount - 1)
      }, 1000)
    }
    if (slowTimerOn) {
      intervalSlow = setInterval(() => {
        setSlowCount((prevSlowCount) => prevSlowCount - 0.25)
      }, 250)
    }
    if (!fastTimerOn && intervalFast) {
      clearInterval(intervalFast)
    }
    if (!slowTimerOn && intervalSlow) {
      clearInterval(intervalSlow)
    }

    return () => {
      if (intervalFast) clearInterval(intervalFast)
    }
  }, [fastTimerOn, slowTimerOn])

  if (!question) {
    return <div>Loading question...</div>
  }
  if (fastTimerOn && fastCount <= 0) {
    setFastTimerOn(false)
    setLoading(false)
    setSlowTimerOn(true)
  }
  if (slowTimerOn && slowCount <= 0) {
    setSlowTimerOn(false)
    setChangeGameState('selectCategory')
    setConsecutiveCorrectAnswers(0)
    setRound(round + 1)
  }
  if (round > gameConfig.questionsPerRound) {
    setScore(
      calculateScore(totalRemainingTime, difficultyMultiplier, gameConfig.increaseDifficultyMultiplier, correctAnswers, consecutiveBonus)
    )
    setChangeGameState('result')
  }
  return (
    <>
      {loading ? (
        <div>{fastCount}</div>
      ) : (
        <>
          <section className="nes-container is-dark">
            <section className="message-list">
              <section className="message -left">
                <i className="nes-bcrikko"></i>
                <div className="nes-balloon from-left is-dark">
                  <p>{question.question}</p>
                </div>
              </section>

              <section className="message -right">
                <div className="nes-balloon from-right is-dark">
                  {question &&
                    answers.map((answer: string, i: number) => (
                      <button className={'answerButton'} key={i} value={answer} onClick={(e) => handleAnswer(e.currentTarget.value)}>
                        {answer}
                      </button>
                    ))}
                </div>
                <i className="nes-bcrikko"></i>
              </section>
            </section>
          </section>
          <div>
            <progress className="nes-progress is-success" value={slowCount} max="30"></progress>
          </div>
        </>
      )}
    </>
  )
}
