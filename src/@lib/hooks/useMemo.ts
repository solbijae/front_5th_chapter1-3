/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const depsRef = useRef<DependencyList | undefined>(undefined);
  const valueRef = useRef<T | undefined>(undefined);

  const hasNoDeps = !depsRef.current;
  const depsChanged = !_equals(_deps, depsRef.current || []);

  if (hasNoDeps || depsChanged) {
    valueRef.current = factory();
    depsRef.current = _deps;
  }

  return valueRef.current as T;
}
