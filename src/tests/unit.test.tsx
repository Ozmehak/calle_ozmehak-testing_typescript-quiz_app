import React from "react";
import { shuffle } from "../utils/Utils";
import { calculateScore } from "../utils/Utils";
import { getCategories } from '../api/Api'


test('shuffle always shuffles input', () => {
  const array = [{ a: 0 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }, { f: 1 }]
  const array2 = shuffle(array)
  expect(array).not.toBe(array2)
  expect(array.length).toBe(array2.length)
})

test('getCategories returns Object ', async () => {
  const response = await getCategories()
  expect(response).toBeInstanceOf(Object)
  expect(Object.keys(response).length).toBeGreaterThan(0)
})

describe('calculateScore', () => {
  it('calculates the score correctly', () => {
    const totalRemainingTime = 60
    const difficultyMultiplier = 1.5
    const increaseDifficultyMultiplier = 0.5
    const correctAnswers = 5
    const consecutiveBonus = 2


    const expectedScore =
      Math.floor(totalRemainingTime * (difficultyMultiplier + increaseDifficultyMultiplier) + correctAnswers) * consecutiveBonus

    const actualScore = calculateScore(
      totalRemainingTime,
      difficultyMultiplier,
      increaseDifficultyMultiplier,
      correctAnswers,
      consecutiveBonus
    )

    expect(actualScore).toBe(expectedScore)
  })
})


describe("shuffle", () => {
  it("should shuffle add the string and shuffle the array", () => {
    const array = ["a", "b", "c", "d", "e", "f"];
    const string = "g";
    const shuffledArray = shuffle(array, string);



    // @ts-ignore
    expect(shuffledArray).toContain(...array, string)

    expect(shuffledArray.length).toBe(array.length + 1)

    expect(shuffledArray).not.toEqual(array)

    expect(Array.isArray(shuffledArray)).toBe(true)
  })
})
