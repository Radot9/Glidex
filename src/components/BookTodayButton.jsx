// src/components/BookTodayButton.jsx
import React from "react";
import "./BookTodayButton.css";

export default function BookTodayButton({ children = "Book Today", ...props }) {
  return (
    <button
      className="relative overflow-hidden bg-[#2DFF28] hover:bg-[#24cc20] text-black font-bold antialiased px-8 py-3 rounded-full shadow transition-colors duration-200 glare-btn shiny-flare"
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute left-[-75%] top-0 h-full w-1/2 opacity-40 glare-effect"></span>
    </button>
  );
}
