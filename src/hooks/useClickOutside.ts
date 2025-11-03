import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (e.target && !ref.current.contains(e.target)){
        callback()
      }
    };
    // ref.current && !ref.current.contains(e.target)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, active]);
}
