import { useEffect } from "react";

function useInterval(callback, delay, dependencies = []) {
    useEffect(() => {
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, delay, ...dependencies]);
};

export default useInterval;