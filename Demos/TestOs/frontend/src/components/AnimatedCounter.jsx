import { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ value, duration = 1200, prefix = "", suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const target = Number(value) || 0;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return (
    <span className="animated-counter">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
