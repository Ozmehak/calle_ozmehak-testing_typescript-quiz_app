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
