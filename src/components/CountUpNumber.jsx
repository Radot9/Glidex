import { useEffect, useRef, useState } from "react";

function useInView(options = {}) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

export default function CountUpNumber({ from = 0, to = 100, duration = 1, className = "" }) {
  const [value, setValue] = useState(from);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frame;
    const totalMs = duration * 1000;

    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / totalMs, 1);
      setValue(Math.floor(from + (to - from) * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [from, to, duration, inView]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}