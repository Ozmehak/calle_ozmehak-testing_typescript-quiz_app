import {shuffle} from "../utils/Utils";
import {useEffect, useState} from "react";
import {QuizStuff} from "../types/Types";
import {getQuizData} from "../api/Api";

export const Categories = () => {
    const [gatorade, setGatorade] = useState<QuizStuff>({});

    useEffect(() => {
        async function fetchData() {
            const data = await getQuizData();
            setGatorade(data);
        }
        fetchData();
    }, []);

    return (
        <>
            {shuffle(Object.keys(gatorade))
                .splice(0, 3)
                .map((category) => (
                    <p key={category}>
                        {category}
                        <button onClick={() => {}}>Play!</button>
                    </p>
                ))}
        </>
    );
};
