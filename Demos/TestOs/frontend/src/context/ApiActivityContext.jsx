import { createContext, useState, useEffect, useCallback } from "react";
import { subscribeApiActivity } from "../utils/apiActivity";

export const ApiActivityContext = createContext(null);

export const ApiActivityProvider = ({ children }) => {
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => subscribeApiActivity(setActiveCount), []);

  const startActivity = useCallback(() => {}, []);
  const endActivity = useCallback(() => {}, []);

  return (
    <ApiActivityContext.Provider value={{ activeCount, isActive: activeCount > 0, startActivity, endActivity }}>
      {children}
    </ApiActivityContext.Provider>
  );
};
