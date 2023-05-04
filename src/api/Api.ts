export const getCategories = (): any => {
  try {
    return fetch("https://the-trivia-api.com/api/categories")
      .then((res) => res.json())
      .then((json) => json);
  } catch (error) {
    console.error(error);

    return "Api is down right now, try again later";
  }
};

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
