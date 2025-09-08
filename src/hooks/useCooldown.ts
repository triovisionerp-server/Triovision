// frontend/src/hooks/useCooldown.ts
import { useEffect, useRef, useState } from "react";

export function useCooldown(seconds: number) {
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = () => setRemaining(seconds);
  const reset = () => setRemaining(0);
  const running = remaining > 0;

  useEffect(() => {
    if (remaining <= 0) return;
    timerRef.current = window.setInterval(() => {
      setRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [remaining]);

  return { remaining, running, start, reset };
}
