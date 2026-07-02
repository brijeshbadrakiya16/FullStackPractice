import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${direction} ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
