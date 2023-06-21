import React, { useContext, useEffect, useState } from 'react'
import { GameStateCtx, QuestionCtx, ScoreCtx } from '../ctx/Context'
import { getCategories } from '../api/Api'
import { shuffle } from '../utils/Utils'

export const Categories = () => {
  const [quizCategories, setQuizCategories] = useState<string[]>([])
  const { category, setCategory, difficulty, setDifficulty, region, setRegion } = useContext(QuestionCtx)
  const { round, setRound, setDifficultyMultiplier, setPlayerName } = useContext(ScoreCtx)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { setChangeGameState } = useContext(GameStateCtx)
  const handleCategory = (event: string) => {
    setCategory(event)
    setChangeGameState('playing')
  }
  const handleDifficulty = (e: string) => {
    const difficultyArray = [1, 3, 5]
    switch (e) {
      case 'easy':
        setDifficultyMultiplier(1)
        break
      case 'medium':
        setDifficultyMultiplier(3)
        break
      case 'hard':
        setDifficultyMultiplier(5)
        break
      case 'random':
        setDifficultyMultiplier(difficultyArray[Math.floor(Math.random() * 3)])
    }
    setDifficulty(e)
  }
  const handleRegion = (e: string) => {
    setRegion(e)
  }
  const handleStart = () => {
    setRound(round + 1)
  }
  const handlePlayerName = (e: string) => {
    setPlayerName(e)
  }

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await getCategories()
        const strings = Object.values(response).flat()
        setQuizCategories(strings as string[])
      } catch (error: any) {
        setErrorMessage('An error occurred: ' + error.message)
      }
    }
    fetchCategories()
  }, [])

  return (
    <QuestionCtx.Provider
      value={{
        category,
        setCategory,
        difficulty,
        setDifficulty,
        region,
        setRegion,
      }}>
      {round < 1 && !errorMessage && (
        <div>
          <input
            onChange={(e) => handlePlayerName(e.currentTarget.value)}
            type="text"
            id="dark_field"
            className="nes-input is-dark nameInput"
            placeholder="Type your name here..."
          />
          <div className="nes-select is-success">
            <select
              className={'dropDown1'}
              defaultValue={'easy'}
              required
              id="success_select"
              onChange={(e) => {
                handleDifficulty(e.currentTarget.value)
              }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="random">Random</option>
            </select>
          </div>

          <div className="nes-select is-success">
            <select
              className={'dropDown2'}
              defaultValue={'SE'}
              required
              id="success_select"
              onChange={(e) => {
                handleRegion(e.currentTarget.value)
              }}>
              <option value="SE">Sweden</option>
              <option value="US">USA</option>
            </select>
          </div>
          <button onClick={() => handleStart()}>Start Game</button>
        </div>
      )}
      {round > 0 && !errorMessage && (
        <div>
          <h2>Choose a category</h2>
          {quizCategories &&
            shuffle(quizCategories)
              .slice(0, 3)
              .map((cat: any) => (
                <button className="categoryButton" key={cat} value={cat} onClick={(event) => handleCategory(event.currentTarget.value)}>
                  {cat}
                </button>
              ))}
        </div>
      )}
      {errorMessage && (
        <div>
          Api is down right now, try again later.
          {errorMessage}
        </div>
      )}
    </QuestionCtx.Provider>
  )
}
