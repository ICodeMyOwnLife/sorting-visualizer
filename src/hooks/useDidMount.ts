import useEffectOnce from "hooks/useEffectOnce";

const useDidMount = (callback: VoidFunction) =>
  useEffectOnce(() => {
    callback();
  });

export default useDidMount;
