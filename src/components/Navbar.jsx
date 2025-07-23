import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlidexLogo from "../images/Glidex Logo.png";
import UserIcon from "../images/user.svg";
import CartIcon from "../images/cart.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLeaving, setMenuLeaving] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle menu close with animation
  const handleCloseMenu = () => {
    setMenuLeaving(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuLeaving(false);
    }, 300);
  };
  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 w-full fixed top-0 left-0 right-0 z-1000 transition-colors duration-300 ${
        scrolled ? "bg-black/90" : "bg-transparent"
      }`}
    >
      {/* Center/First: Logo */}
      <div className="order-1 md:order-2 flex-1 flex justify-start md:justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
        <img
          src={GlidexLogo}
          alt="Glidex Logo"
          className="h-10 w-auto max-h-10 object-contain"
        />
      </div>
      {/* Left: Nav Links */}
      <div className="order-2 md:order-1 flex space-x-4 md:space-x-8 hidden md:flex">
        <MotionLink to="/">Home</MotionLink>
        <MotionLink to="/about">About</MotionLink>
        <MotionLink to="/shop">Shop</MotionLink>
        
        <MotionLink to="/contact">Contact</MotionLink>
      </div>
      {/* Right: User and Cart Icons + Hamburger */}
      <div className="order-3 flex items-center space-x-2">
        {/* User Icon */}
        <button
          className="bg-transparent px-2 py-2 md:px-4 md:py-2"
          aria-label="User"
        >
          <img src={UserIcon} alt="User" className="w-6 h-6 object-contain" />
        </button>
        {/* Cart Icon */}
        <button
          className="bg-transparent px-2 py-2 md:px-4 md:py-2"
          aria-label="Cart"
        >
          <img src={CartIcon} alt="Cart" className="w-6 h-6 object-contain" />
        </button>
        {/* Hamburger Icon */}
        <button
          className="block md:hidden p-2 px-2 py-2 md:px-4 md:py-2"
          aria-label="Open Menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {/* Mobile Menu Overlay */}
        {(menuOpen || menuLeaving) && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-end">
            {/* Glassy blurred background */}
            <div
              className="absolute inset-0 bg-gray/30 backdrop-blur-md transition-opacity duration-300"
              onClick={handleCloseMenu}
            ></div>
            {/* Sliding Menu */}
            <div
              className={`relative w-4/5 max-w-xs h-screen bg-white/50 shadow-lg p-8 flex flex-col items-end ${
                menuLeaving
                  ? "animate-slide-out-right"
                  : "animate-slide-in-right"
              }`}
            >
              <button
                className="mb-8 self-end w-10 h-10 flex items-center justify-center text-gray-700 text-4xl"
                aria-label="Close Menu"
                onClick={handleCloseMenu}
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
              <nav className="flex flex-col space-y-8 w-full text-right">
                <FlipLink to="/" onClick={handleCloseMenu}>
                  Home
                </FlipLink>
                <FlipLink to="/about" onClick={handleCloseMenu}>
                  About
                </FlipLink>
                <FlipLink to="/shop" onClick={handleCloseMenu}>
                  Shop
                </FlipLink>

                <FlipLink to="/contact" onClick={handleCloseMenu}>
                  Contact
                </FlipLink>
              </nav>
            </div>
            <style>{`
              @keyframes slide-in-right {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0); }
              }
              @keyframes slide-out-right {
                0% { transform: translateX(0); }
                100% { transform: translateX(100%); }
              }
              .animate-slide-in-right {
                animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1) both;
              }
              .animate-slide-out-right {
                animation: slide-out-right 0.3s cubic-bezier(0.4,0,0.2,1) both;
              }
            `}</style>
          </div>
        )}
      </div>
    </nav>
  );
}

// Animation constants (shared)
const DURATION = 0.25;
const STAGGER = 0.025;

// Reusable animated flip component for links and buttons
export function AnimatedFlip({
  children,
  as: Component = "span",
  className = "",
  onClick,
  ...props
}) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={props.style}
      onClick={onClick}
    >
      <Component {...props} className={props.innerClassName || ""}>
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="absolute inset-0">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </Component>
    </motion.div>
  );
}

// Desktop nav: preserve font style
function MotionLink({ children, to }) {
  return (
    <AnimatedFlip
      as={Link}
      to={to}
      innerClassName="text-xl font-semibold block w-full h-full"
    >
      {children}
    </AnimatedFlip>
  );
}

// Mobile nav: use FlipLink style
function FlipLink({ children, to, onClick }) {
  return (
    <AnimatedFlip
      as={Link}
      to={to}
      onClick={onClick}
      className="whitespace-nowrap text-3xl font-black uppercase cursor-pointer text-black"
      style={{ lineHeight: 0.9 }}
      innerClassName="block w-full h-full"
    >
      {children}
    </AnimatedFlip>
  );
}
