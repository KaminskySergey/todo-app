import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;

    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, active]);
}
