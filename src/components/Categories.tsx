import React, { useContext, useEffect, useState } from 'react'
import { GameStateCtx, QuestionCtx, ScoreCtx } from '../ctx/Context'
import { getCategories } from '../api/Api'
import { shuffle } from '../utils/Utils'

export const Categories = () => {
  const [quizCategories, setQuizCategories] = useState<string[]>([])
  const { category, setCategory, difficulty, setDifficulty, region, setRegion } = useContext(QuestionCtx)
  const { round, setRound, setDifficultyMultiplier, setPlayerName } = useContext(ScoreCtx)
  const { setChangeGameState, setError } = useContext(GameStateCtx)
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
  const handleRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.currentTarget.value)
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
        if (response.statusText >= 400) {
          throw new Error('Bad response from server')
        }
      } catch (error: any) {
        setError('Api seems to be down, try again later')
      }
    }
    fetchCategories()
  }, [setError])

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
      {round < 1 && (
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
                handleRegion(e)
              }}>
              <option value="SE">Sweden</option>
              <option value="US">USA</option>
            </select>
          </div>
          <button onClick={() => handleStart()}>Start Game</button>
        </div>
      )}
      {round > 0 && (
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
    </QuestionCtx.Provider>
  )
}
