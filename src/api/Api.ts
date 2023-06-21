export const getCategories = (): any => {
  try {
    return fetch('https://the-trivia-api.com/api/categories')
      .then((res) => res.json())
      .then((json) => json)
  } catch (error) {
    console.error(error)
    return 'Api is down right now, try again later'
  }
}

export const getQuizQuestion = async (category: string, region: string, difficulty?: string) => {
  try {
    const actualDifficulty = difficulty === 'random' ? '' : difficulty

    return fetch(
      `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&region=${region}${
        actualDifficulty ? `&difficulty=${actualDifficulty}` : ''
      }`
    )
      .then((res) => res.json())
      .then((json) => json)
  } catch (error) {
    console.error(error)
  }
}
