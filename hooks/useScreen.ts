import { useEffect, useState } from "react";

export function useScreen() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth);
    });
  }, []);
  return { width };
}
