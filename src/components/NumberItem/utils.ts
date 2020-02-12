import { useState, useImperativeHandle, Ref } from 'react';
import useTimeoutCallback from 'hooks/useTimeoutCallback';
import { ANIMATION_TIMEOUT } from 'constants/common';

export const useNumberItemRef = ({ ref }: { ref: Ref<NumberItemObject> }) => {
  const [inspected, setInspected] = useState(false);
  const [changed, setChanged] = useState(false);
  const clearInspected = useTimeoutCallback(
    () => setInspected(false),
    ANIMATION_TIMEOUT,
  );
  const clearChanged = useTimeoutCallback(
    () => setChanged(false),
    ANIMATION_TIMEOUT,
  );

  useImperativeHandle(
    ref,
    () => ({
      markInspected: async () => {
        setInspected(true);
        await clearInspected();
      },
      markChanged: async () => {
        setChanged(true);
        await clearChanged();
      },
    }),
    [clearInspected, clearChanged],
  );

  return { inspected, changed };
};

export interface NumberItemObject {
  markChanged: () => Promise<void>;
  markInspected: () => Promise<void>;
}
