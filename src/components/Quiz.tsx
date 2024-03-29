import { useEffect, useState } from 'react'
import { Question } from './Question'
import { Categories } from './Categories'
import { GameStateCtx, QuestionCtx, ScoreCtx } from '../ctx/Context'
import styled from 'styled-components'
import { gameConfig } from '../utils/GameConfig'

export enum GameState {
  LOADING,
  SELECT_CATEGORY,
  PLAYING,
  RESULT,
}

export const Quiz = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECT_CATEGORY)
  const [changeGameState, setChangeGameState] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [round, setRound] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState<number>(0)
  const [consecutiveBonus, setConsecutiveBonus] = useState<number>(1)
  const [totalRemainingTime, setTotalRemainingTime] = useState<number>(0)
  const [difficultyMultiplier, setDifficultyMultiplier] = useState<number>(1)
  const [difficulty, setDifficulty] = useState<string>('easy')
  const [region, setRegion] = useState<string>('SE')
  const [category, setCategory] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    switch (changeGameState) {
      case 'playing':
        setGameState(GameState.PLAYING)
        break
      case 'result':
        setGameState(GameState.RESULT)
        break
      case 'selectCategory':
        setGameState(GameState.SELECT_CATEGORY)
        break
      default:
        setGameState(GameState.SELECT_CATEGORY)
    }
  }, [changeGameState, error])

  return (
    <GameStateCtx.Provider value={{ changeGameState, setChangeGameState, setError }}>
      <QuestionCtx.Provider
        value={{
          category,
          setCategory,
          difficulty,
          setDifficulty,
          region,
          setRegion,
        }}>
        <ScoreCtx.Provider
          value={{
            score,
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
            setDifficultyMultiplier,
            playerName,
            setPlayerName,
          }}>
          <>
            <Header className="nes-container is-rounded is-dark">
              <a href={'/'}>
                <button>Reset</button>
              </a>

              <div>
                Round:
                {round <= gameConfig.questionsPerRound ? (
                  <HeaderNumbers>
                    {round} / {gameConfig.questionsPerRound}
                  </HeaderNumbers>
                ) : (
                  <HeaderNumbers>Game Over</HeaderNumbers>
                )}
              </div>
              <div>
                Correct Answers: <HeaderNumbers>{correctAnswers}</HeaderNumbers>
              </div>
              <div>
                Streak: x <HeaderNumbers>{consecutiveBonus}</HeaderNumbers>
              </div>
              <div>
                Bonus Time: <HeaderNumbers>{totalRemainingTime}</HeaderNumbers>
              </div>
            </Header>
            <Main className="nes-container is-rounded is-dark">
              {error && <div>{error}</div>}
              {gameState === GameState.LOADING && !error && <div>loading</div>}
              {gameState === GameState.SELECT_CATEGORY && !error && <Categories />}
              {gameState === GameState.PLAYING && !error && (
                <div className="nes-container is-rounded is-dark">
                  <Question />
                </div>
              )}
              {gameState === GameState.RESULT && (
                <div>
                  Well done {playerName}! Score: {score}{' '}
                </div>
              )}
            </Main>
            <Footer className="nes-container is-rounded is-dark">&copy; 2023 Calle Özmehak</Footer>
          </>
        </ScoreCtx.Provider>
      </QuestionCtx.Provider>
    </GameStateCtx.Provider>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  border-radius: 0.5rem;
  height: 15vh;
`
const HeaderNumbers = styled.span`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`
const Main = styled.div`
  height: 79vh;
`

const Footer = styled.div`
  height: 5vh;
`
