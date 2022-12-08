import {useEffect, useState} from "react";

interface IQuestions {
    question?: string
    incorrectAnswers?: string[]
}

export const Questions = ({question, incorrectAnswers}: IQuestions) => {
    const [questions, setQuestions] = useState<any[]>([])
    useEffect(() => {
        fetch('https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=20&difficulty=medium')
            .then((res) => res.json())
            .then((res) => setQuestions(res))
    }, [])


    return (
        <>
            {questions && questions.splice(1, 1).map((question) =>
                <div>
                    <p>{question['question']}</p>
                    <p>{question['correctAnswer']}</p>
                    {question.incorrectAnswers.map((e:any) => {
                        return <p>{e}</p>
                    })}
                </div>)}
        </>
    )
}
