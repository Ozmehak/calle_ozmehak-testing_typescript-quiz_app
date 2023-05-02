import {useState, useEffect} from "react";
import {Bar} from "./Bar";

interface Props {
    time: number;
}

export const Timer = ({time}: Props) => {
    const [count, setCount] = useState<number>(time);
    const [timerOn, setTimerOn] = useState<boolean>(false);


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timerOn) {
            interval = setInterval(() => {
                setCount((prevCount) => prevCount - 1);
            }, 1000);
        } else if (!timerOn && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerOn]);

    return (
        <div>
            <Bar value={count} maxValue={30}/>
            <p>{count}</p>
            <button onClick={() => setTimerOn(true)}>Start</button>
            <button onClick={() => setTimerOn(false)}>Stop</button>
            <button onClick={() => setCount(30)}>Reset</button>
        </div>
    );
};
