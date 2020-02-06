import { useRef, useEffect, useCallback } from "react";
import useDidMount from "./useDidMount";

const useTimeoutCallback = (callback: VoidFunction, ms: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useDidMount(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  });

  const timeoutCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current?.();
    }, ms);
  }, [ms]);

  return timeoutCallback;
};

export default useTimeoutCallback;
