export interface Question {
    correctAnswer: string
    incorrectAnswers: string[]
    question: string
    difficulty: string
}


export interface QuizStuff {
    categories?: any
    res?: any
    data?: any
    error?: any
    loading?: boolean
    mockarray?: string[]
}
