import {useEffect, useState} from "react";
import { shuffle } from "../utils";
import {Questions} from "./Questions";

interface QuizStuff {
    category?: string
    res?: any
}

enum GameState {
    MENU,
    SELECT_CATEGORY,
    PLAYING,
    RESULT
}


export const Quiz = ({category, res}: QuizStuff) => {

    console.log(GameState)
    const [gameState, setGameState] = useState(GameState.MENU)
    const [categories, setCategories] = useState<QuizStuff[]>([])
    useEffect(() => {
        fetch('https://the-trivia-api.com/api/categories')
            .then((res: Response) => res.json())
            .then((res) => setCategories(res))

    }, [])


    console.log(categories)
    return (

        <>

            {gameState === GameState.MENU ? <button onClick={() => setGameState(GameState.SELECT_CATEGORY)}>Start Kvizz</button>
                : <button onClick={() => setGameState(GameState.MENU)}>Stop</button>}
            {gameState === GameState.SELECT_CATEGORY && shuffle(Object.keys(categories)).splice(0, 3).map((category: any) =>
                <p>{category}<button onClick={() => setGameState(GameState.PLAYING)}>Play!</button></p>)}

            {gameState === GameState.PLAYING && <Questions />}
        </>
    )
}
