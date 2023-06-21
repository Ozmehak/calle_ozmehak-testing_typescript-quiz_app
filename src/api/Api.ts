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

export const getQuizQuestion = async (category: string, difficulty: string, region: string) => {
  try {
    return fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}&region=${region}`)
      .then((res) => res.json())
      .then((json) => json)
  } catch (error) {
    console.error(error)
  }
}
