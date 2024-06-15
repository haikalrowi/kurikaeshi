import { useEffect, useState } from "react";

export function useScreen() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.onresize = () => {
      setWidth(screen.width);
    };
  }, []);
  return { width };
}
