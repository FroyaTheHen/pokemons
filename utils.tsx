import { useEffect } from "react";

export function useAsyncEffect(
  fun: () => Promise<void>,
  deps?: React.DependencyList
) {
  useEffect(() => {
    async function tmp() {
      await fun();
    }
    tmp();
  }, deps);
}
