import {shuffle} from "../utils/Utils";
import {useEffect, useState} from "react";
import {QuizStuff} from "../types/Types";
import {getQuizData} from "../api/Api";
import {mockData} from "../api/Api";

export const Categories = ()  => {
    const [gatorade, setGatorade] = useState<QuizStuff> ([])
    async function awaitData() :Promise<void> {
        const result = await mockData()
        setGatorade(result)
    }


    useEffect( () => {

        getQuizData().then(data  => setGatorade(data))
        awaitData()
    }, [])


    return(

        <>
            { shuffle(Object.keys(gatorade)).splice(0, 3).map((category: any) =>
                <p>{category}
                    <button onClick={() => {}}>Play!</button>
                </p>)}
        </>


    )
}
