import { useEffect } from "react";

function useInterval(callback, delay, dependencies = []) {
    useEffect(() => {
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
    }, [callback, ...dependencies]);
};

export default useInterval;