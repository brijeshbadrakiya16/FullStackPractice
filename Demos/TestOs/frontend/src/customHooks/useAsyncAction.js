import { useState, useCallback, useRef } from "react";
import { useApiActivity } from "./useApiActivity";

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false);
  const lockRef = useRef(false);
  const { startActivity, endActivity } = useApiActivity();

  const run = useCallback(
    async (asyncFn, { onError, silent } = {}) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setLoading(true);
      if (!silent) startActivity();
      try {
        return await asyncFn();
      } catch (err) {
        if (onError) onError(err);
        else throw err;
      } finally {
        lockRef.current = false;
        setLoading(false);
        if (!silent) endActivity();
      }
    },
    [startActivity, endActivity]
  );

  return { loading, run, isLocked: loading };
};
