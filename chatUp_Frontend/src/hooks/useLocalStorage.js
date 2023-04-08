import { useState, useEffect } from "react";
// import { json } from "stream/consumers";

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
