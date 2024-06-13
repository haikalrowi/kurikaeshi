import { useEffect, useState } from "react";

export function useScreen() {
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth);
    });
  }, []);
  return { width };
}
