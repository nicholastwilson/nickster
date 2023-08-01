import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    // Retrieve from local storage or generate initial value
    const [value, setValue] = useState(() => {
        // Check if key is already in local storage
        console.log(`[useLocalStorage] Get "${key}" = ${JSON.parse(localStorage.getItem(key))}`);
        // console.log(new Error().stack.replace(/.*\n/g, " -> "));
        const storedValue = JSON.parse(localStorage.getItem(key));
        if(storedValue)
            return storedValue;
        // Check for initial value generator function
        if(initialValue instanceof Function)
            return initialValue();
        // Return initial value
        return initialValue;
    });

    // Update local storage when value changes
    useEffect(() => {
        console.log(`[useLocalStorage] Set "${key}" => ${JSON.stringify(value)}`);
        // const stack = new Error().stack.replace(/.*\n/g, " -> ");
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Return value and setter
    return [value, setValue];
};

export default useLocalStorage;