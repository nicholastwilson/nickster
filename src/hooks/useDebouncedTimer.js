import { useState, useEffect, useMemo } from "react";
import _ from "lodash";

const useDebouncedTimer = (duration, period = duration, initialDelay = -1) => {
    // Logo spinning animation
    const [active, setActive] = useState(false);

    // Debounced trigger function
    const startTimer = useMemo(() => 
        _.debounce(() => {
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, duration);
        }, period, { leading: true, trailing: false, maxWait: period })
    , [period, duration]);

    // Spin logo once after page loads
    useEffect(() => {
        if(initialDelay >= 0) {
            setTimeout(() => {
                startTimer();
            }, initialDelay);
        }
    }, [initialDelay, startTimer]);


    // Debounced trigger function
    return [active, startTimer];
};

export default useDebouncedTimer;