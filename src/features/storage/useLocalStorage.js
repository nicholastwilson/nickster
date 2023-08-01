import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key, initialValue) => {
    // Read value from localStorage
    const readValue = useCallback(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    }, [key, initialValue]);

    // State for localStorage value
    const [storedValue, setStoredValue] = useState(readValue);

    // Setter function
    const setValue = (value) => {
        const newValue = value instanceof Function ? value(storedValue) : value;
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
    };

    // Save to localStorage when value changes
    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Return value and setter
    return [storedValue, setValue];
};

export default useLocalStorage;