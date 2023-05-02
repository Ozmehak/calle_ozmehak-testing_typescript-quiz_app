import {useEffect, useState} from "react";
import {Questions} from "./Questions";
import {Question} from "../types/Types";
import {Categories} from "./Categories";
import {Timer} from "./Timer";


enum GameState {
    MENU,
    SELECT_CATEGORY,
    PLAYING,
    RESULT,
    LOADING
}


export const Quiz = () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [gameState, setGameState] = useState(GameState.LOADING)

    useEffect(() => {

    }, [])

    const question = questions[0]
    return (

        <>
            {gameState === GameState.LOADING && <p>Loading</p>}
            {gameState === GameState.MENU ? <button onClick={() => setGameState(GameState.SELECT_CATEGORY)}>Start Kvizz</button>
                : <button onClick={() => setGameState(GameState.MENU)}>Stop</button>}
            {gameState === GameState.SELECT_CATEGORY && <Categories/>}

            {gameState === GameState.PLAYING && <Questions question={question} onChoice={(choice) => {
                console.log('bestäm här', choice)
            }}/>}
            <Timer time={30}/>
        </>
    )
}
