import { useEffect, useState } from "react";

// Set your offer end date/time here (YYYY-MM-DDTHH:MM:SSZ or local)
const OFFER_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function getTimeLeft() {
  const now = new Date();
  const diff = OFFER_END - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const entries = Object.entries(timeLeft);
  return (
    <div className="flex flex-row gap-6 md:gap-10 items-center bg-[#181818] px-6 py-4 min-w-[260px] justify-center w-full">
      {entries.map(([label, value], idx) => (
        <>
          <div key={label} className="flex flex-col items-center px-2">
            <span className="text-2xl md:text-3xl font-bold text-[#2DFF28] tabular-nums">{String(value).padStart(2, '0')}</span>
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">{label}</span>
          </div>
          {idx < entries.length - 1 && (
            <div className="h-8 w-px bg-white/50" style={{ opacity: 0.17 }} aria-hidden="true"></div>
          )}
        </>
      ))}
    </div>
  );
}
