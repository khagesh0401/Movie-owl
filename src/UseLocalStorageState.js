import { useState, useEffect } from "react";
export default function UseLocalStorageState(initalstate, key) {
  const [value, setvalue] = useState(function () {
    const storeddvalue = localStorage.getItem(key);
    return storeddvalue ? JSON.parse(storeddvalue) : initalstate;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setvalue];
}
