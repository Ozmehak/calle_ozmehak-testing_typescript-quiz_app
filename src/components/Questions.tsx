import {Question} from "../types/Types";

interface QuestionsProps {
    onChoice?: (choice: string) => void
    question: Question
}

export const Questions = ({onChoice, question}: QuestionsProps) => {


    function handleChoiceClick(choice: string) {
        onChoice?.(choice)
    }


    return (
        <>
            {question && <div>
                <p>{question['question']}</p>
                <p>{question['correctAnswer']}</p>
                {question.incorrectAnswers.map((e) => {
                    return <button onClick={() => handleChoiceClick(e)}>{e}</button>
                })}
            </div>}
        </>
    )
}
