import { useRef, useEffect, useCallback } from 'react';
import useDidMount from './useDidMount';

const useTimeoutCallback = <TValue>(callback: () => TValue, ms: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<TimeoutObject>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useDidMount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current.handle);
      timeoutRef.current.resolve();
    }
  });

  const timeoutCallback = useCallback(
    () =>
      new Promise<TValue | undefined>(resolve => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current.handle);
          timeoutRef.current.resolve();
        }
        const handle = setTimeout(() => {
          resolve(callbackRef.current?.());
        }, ms);
        timeoutRef.current = { handle, resolve };
      }),
    [ms],
  );

  return timeoutCallback;
};

export default useTimeoutCallback;

interface TimeoutObject {
  handle: NodeJS.Timeout;
  resolve: VoidFunction;
}
