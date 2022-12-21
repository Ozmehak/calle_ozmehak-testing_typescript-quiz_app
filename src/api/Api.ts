import {QuizStuff} from "../types/Types";


export const getQuizData = (): Promise<QuizStuff> => {
    return fetch('https://the-trivia-api.com/api/categories')
        .then((res) => res.json())
        .then((json) => {return json})


}
export async function mockData(): Promise<QuizStuff> {
    return {mockarray: ['a','b','c']}


}

/*
Promise.all([

    fetch('https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=20&difficulty=medium')
        .then((res) => res.json())
])
    .then(([categories, questions]) => {
        setCategories(categories)
        setQuestions(questions)
        setGameState(GameState.MENU)
    })
    .catch(error => {
        console.error(error)
    })
*/
/*
fetch('https://the-trivia-api.com/api/categories')
    .then(res => {
        if (!res.ok) {
            throw new Error('could not fetch categories')
        }
        return res

    })
    .then((res) => res.json())
    .then((res) => { return res
    })*/
