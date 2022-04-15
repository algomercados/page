import { useState, useEffect } from "react";

export const useClock = () => {
    const [time, setTime] = useState<string>();
    function clock() {
        let newTime = new Date().toLocaleTimeString();
        setTime(newTime);
    }
    useEffect(() => {
        let timerId = setInterval(clock, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    return time;
};
