import { useState, useImperativeHandle, Ref } from "react";
import useTimeoutCallback from "hooks/useTimeoutCallback";
import { ANIMATION_TIMEOUT } from "constants/common";
import useIsMounted from "hooks/useIsMounted";

export const useNumberItemRef = ({ ref }: { ref: Ref<NumberItemObject> }) => {
  const isMounted = useIsMounted();
  const [compared, setCompared] = useState(false);
  const [moved, setMoved] = useState(false);
  const clearComparedOnTimeout = useTimeoutCallback(
    () => setCompared(false),
    ANIMATION_TIMEOUT
  );
  const clearMovedOnTimeout = useTimeoutCallback(
    () => setMoved(false),
    ANIMATION_TIMEOUT
  );

  useImperativeHandle(
    ref,
    () => ({
      compare: () => {
        if (!isMounted()) return;
        setCompared(true);
        clearComparedOnTimeout();
      },
      move: () => {
        if (!isMounted()) return;
        setMoved(true);
        clearMovedOnTimeout();
      }
    }),
    [clearComparedOnTimeout, clearMovedOnTimeout, isMounted]
  );

  return { compared, moved };
};

export interface NumberItemObject {
  compare: VoidFunction;
  move: VoidFunction;
}
