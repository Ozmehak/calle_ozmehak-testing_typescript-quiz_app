import { useState, useEffect } from "react";

interface Props {
    value: number;
    maxValue: number;
}

export const Bar = ({ value, maxValue }: Props) => {
    const [percent, setPercent] = useState(100);

    useEffect(() => {
        const newPercent = (value / maxValue) * 100
        setPercent(newPercent);
    }, [value, maxValue]);

    return (
        <div className="bar-container">
            <div className="bar-fill" style={{ width: `${percent}%`, border: '1px red solid', height: '10px', background: "orange"  }}></div>
        </div>
    );
};

