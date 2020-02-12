import { useCallback, useRef, DependencyList, useEffect } from 'react';

const useWorkerCallback = <TPostMessage = unknown, TReceiveMessage = unknown>(
  url: string,
  options?: WorkerOptions,
  deps: DependencyList = [url, options],
) => {
  const workerRef = useRef<Worker>();

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = undefined;
    }
  }, []);

  const workerCallback = useCallback(
    (message: TPostMessage, opts?: PostMessageOptions) => {
      terminateWorker();
      return new Promise<TReceiveMessage>((resolve, reject) => {
        const worker = new Worker(url, options);
        worker.postMessage(message, opts);
        worker.addEventListener('message', e => resolve(e.data));
        worker.addEventListener('error', e => reject(e.error));
        workerRef.current = worker;
      });
    },
    [options, terminateWorker, url],
  );

  useEffect(() => {
    terminateWorker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return workerCallback;
};

export default useWorkerCallback;
