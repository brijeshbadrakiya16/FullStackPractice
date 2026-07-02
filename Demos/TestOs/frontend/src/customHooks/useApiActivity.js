import { useContext } from "react";
import { ApiActivityContext } from "../context/ApiActivityContext";

const noop = () => {};

export const useApiActivity = () => {
  const ctx = useContext(ApiActivityContext);
  if (!ctx) {
    return { activeCount: 0, isActive: false, startActivity: noop, endActivity: noop };
  }
  return ctx;
};
