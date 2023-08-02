import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const useDebouncedTimer = (duration, period = duration, initialDelay = -1) => {
    // Logo spinning animation
    const [active, setActive] = useState(false);

    // Debounced trigger function
    const startTimer = useCallback(
        _.debounce(() => {
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, duration);
        }, period, { leading: true, trailing: false, maxWait: period })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

    // Spin logo once after page loads
    useEffect(() => {
        if(initialDelay >= 0) {
            setTimeout(() => {
                startTimer();
            }, initialDelay);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Debounced trigger function
    return [active, startTimer];
};

export default useDebouncedTimer;