import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Retrieve from local storage or generate initial value
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });
    // Update local storage when value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
    return [value, setValue];
};

function getSavedValue(key, initialValue) {
    // Check if key is already in local storage
    const storedValue = JSON.parse(localStorage.getItem(key));
    if(storedValue)
        return storedValue;
    // Check for initial value generator function
    if(initialValue instanceof Function)
        return initialValue();
    // Return initial value
    return initialValue;
}

export default useLocalStorage;