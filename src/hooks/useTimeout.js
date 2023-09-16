import { useEffect } from "react";

function useTimeout(callback, delay, dependencies = []) {
    useEffect(() => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }, [callback, ...dependencies]);
};

export default useTimeout;