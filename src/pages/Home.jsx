import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroSlides from "../data/heroSlides";
import proX1Img from "../images/glider-pro-x1.jpg";
import urbanLiteImg from "../images/glider-urban-lite.jpg";
import explorerZImg from "../images/glider-explorer-z.jpg";
import BookTodayButton from "../components/BookTodayButton";

import featureImg from "../images/electric-scooter-feature-1.jpg";
import { BestSellerCard } from "../components/BestSellerCard";
import CountdownTimer from "../components/CountdownTimer";


const SLIDE_DURATION = 10000; // 10 seconds

export default function Home() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const progressBarRef = useRef(null);
  const slideCount = heroSlides.length;

  // Animate progress bar with CSS
  useEffect(() => {
    const bar = progressBarRef.current;
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      // Force reflow to restart animation
      void bar.offsetWidth;
      bar.style.transition = `width ${SLIDE_DURATION}ms linear`;
      bar.style.width = "100%";
    }
  }, [current, slideCount]);

  // Auto-advance carousel every SLIDE_DURATION ms
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current, slideCount]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const { image, title, description } = heroSlides[current];

  return (
    <>
      {/* Hero Image Slider */}
      <div
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-cover bg-center relative items-center transition-all duration-700"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="relative z-10 text-white text-left px-4 sm:px-8 md:px-12 max-w-[850px] w-full mx-auto md:mx-0">
          {/* Reserve space for hero text to prevent layout shift */}
          <div
            style={{ minHeight: 270, maxWidth: 700 }}
            className="flex flex-col justify-end"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={current + "-title"}
                className="font-bold capitalize mb-4 text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ minHeight: 50 }}
              >
                {title}
              </motion.h1>
              <motion.p
                key={current + "-desc"}
                className="mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                style={{ minHeight: 120 }} // ~1.2em * 7 lines
              >
                {description}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-8 mt-8 flex-wrap">
            <button className="relative overflow-hidden bg-[#2DFF28] hover:bg-[#24cc20] text-black font-bold antialiased px-8 py-3 rounded-full shadow transition-colors duration-200 glare-btn shiny-flare">
              Book Today
              <span className="pointer-events-none absolute left-[-75%] top-0 h-full w-1/2 opacity-40 glare-effect"></span>
            </button>
            <style>{`
              .glare-btn:hover .glare-effect {
                animation: glare-move 0.8s linear;
              }
              @keyframes glare-move {
                0% {
                  left: -75%;
                  opacity: 0.4;
                }
                60% {
                  left: 110%;
                  opacity: 0.5;
                }
                100% {
                  left: 110%;
                  opacity: 0;
                }
              }
              .glare-effect {
                background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.2) 100%);
                border-radius: 9999px;
                filter: blur(1px);
              }
              .shiny-flare::before {
                content: '';
                position: absolute;
                top: 0;
                left: -60%;
                width: 60%;
                height: 100%;
                background: linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 100%);
                transform: skewX(-20deg);
                opacity: 0.7;
                pointer-events: none;
                transition: none;
              }
              .shiny-flare:hover::before {
                animation: shiny-move 0.8s linear;
              }
              @keyframes shiny-move {
                0% {
                  left: -60%;
                  opacity: 0.7;
                }
                60% {
                  left: 120%;
                  opacity: 1;
                }
                100% {
                  left: 120%;
                  opacity: 0;
                }
              }
            `}</style>
            <div className="flex items-center gap-2 group">
              <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#2DFF28] text-[#2DFF28] hover:bg-[#2DFF28] hover:text-black transition-colors transition-transform duration-300 shadow-lg hover:scale-110 hover:shadow-xl">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-3">
                <span className="text-gray-300 text-sm">Play Video</span>
                <span className="text-white font-medium text-base ">
                  How we do
                </span>
              </div>
            </div>
          </div>
          {/* Slider Controls */}
          <div className="flex gap-4 mt-8 flex-col">
            {/* Timer Bar */}
            <div className="relative w-64 md:w-96 lg:w-full h-[2px] bg-white/30 rounded overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-[#2DFF28]"
                style={{ width: "0%" }}
              />
            </div>
            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="flex items-end w-24 gap-2 px-4 h-10 rounded-full text-[#2DFF28] transition-colors duration-200 shadow-lg font-semibold text-base group"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Next
              <motion.svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
        {/* Right side of grid intentionally left empty */}
        <div className="hidden md:block" />
      </div>

      {/* Features Section (unchanged) */}
      <section className="w-full mx-auto px-4 sm:px-8 md:px-12 py-24 flex flex-col items-center">
        <div>
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Elevate Your Ride with Electric Power
          </motion.h2>
          <motion.p
            className="text-center max-w-3xl mx-auto text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            Built for reliability and innovation, our e-bikes empower your
            journey with speed, range, and comfort—wherever the road takes you.
          </motion.p>
        </div>
        <img
          src={featureImg}
          alt="E-Bike placeholder"
          className="my-8 rounded-lg shadow-lg w-full object-cover"
          style={{ maxWidth: "100%", display: "block" }}
        />
        {/* Metrics */}
        <motion.div
          className="w-full flex justify-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-white">60mph</div>
              <div className="text-sm text-gray-400 mt-2">4-speed mode</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-white">12mi</div>
              <div className="text-sm text-gray-400 mt-2">Km Range</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-white">440lbs</div>
              <div className="text-sm text-gray-400 mt-2">Frame Weight</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-white">24kw</div>
              <div className="text-sm text-gray-400 mt-2">Per charge</div>
            </div>
          </div>
        </motion.div>
        <motion.p
          className="text-center max-w-3xl mx-auto text-gray-400 my-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
        >
          Our electric bikes deliver outstanding performance with a top speed of
          60mph, a range of up to 12 miles on a single charge, and a lightweight
          yet robust frame supporting up to 440lbs. The advanced 24kW motor
          provides instant acceleration and smooth power delivery, making every
          ride efficient and exhilarating—perfect for both daily commutes and
          weekend adventures.
        </motion.p>
        <div className="relative w-full flex justify-center items-center my-8">
          {/* Divider line */}
          <div 
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] w-full z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0) 100%)',
              border: 'none',
            }}
          />
          <div className="action flex gap-6 justify-center w-full relative z-10">
            <BookTodayButton />
            <button className="relative bg-white text-black font-bold antialiased px-8 py-3 rounded-full shadow transition-colors duration-200 border border-gray-300 hover:bg-gray-100">
              Compare
            </button>
          </div>
        </div>
        {/* Marquee Text */}
        <div 
          className="w-full overflow-hidden my-8 relative"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, #000 30%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 30%, #000 70%, transparent 100%)',
          }}
        >
          <div
            className="marquee-inner whitespace-nowrap text-4xl font-bold tracking-wide text-gray-400"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              animation: 'marqueeText 12s linear infinite',
            }}
          >
            <span style={{ display: 'inline-block' }}>
              *  Silent Speed, Green Adventure &nbsp; *  Silent Speed, Green Adventure &nbsp; *  Silent Speed, Green Adventure &nbsp; *  Silent Speed, Green Adventure &nbsp; *  Silent Speed, Green Adventure &nbsp; *  Silent Speed, Green Adventure
            </span>
          </div>
          <style>{`
            @keyframes marqueeText {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </section>

    

      {/* Shop Best Seller Section */}
      <section className="w-full mx-auto px-4 sm:px-8 md:px-12 py-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">Shop Best Seller</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-400 mb-12 text-lg">Discover our most popular electric bikes, chosen for their performance, reliability, and style. Perfect for every journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <BestSellerCard
            image={proX1Img}
            title="Glidex Pro X1"
            description="A high-performance e-bike for city and adventure."
            features={[
              { icon: 'battery', label: '77KWH' },
              { icon: 'range', label: '126 KM' },
              { icon: 'emission', label: '0.12g/Km' },
            ]}
          />
          <BestSellerCard
            image={urbanLiteImg}
            title="Glidex Urban Lite"
            description="Lightweight, efficient, and perfect for daily commutes."
            features={[
              { icon: 'battery', label: '77KWH' },
              { icon: 'range', label: '126 KM' },
              { icon: 'emission', label: '0.12g/Km' },
            ]}
          />
          <BestSellerCard
            image={explorerZImg}
            title="Glidex Explorer Z"
            description="Built for long range and rugged terrain."
            features={[
              { icon: 'battery', label: '77KWH' },
              { icon: 'range', label: '126 KM' },
              { icon: 'emission', label: '0.12g/Km' },
            ]}
            isNewArrival={true}
          />
        </div>
        {/* Countdown Timer Section */}
      <div className="w-full max-w-none py-8 flex flex-col items-center">
        <div className="w-full bg-[#232323] shadow-lg flex flex-col md:flex-row items-center justify-between p-8 gap-8">
          {/* Text Left */}
          <div className="w-full md:w-1/2 text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Grab Soon! Offer Ends Soon.</h3>
            <p className="text-gray-300 text-base mb-0">Don't miss out on our limited-time deals for our best-selling e-bikes. Secure yours before the countdown hits zero!</p>
          </div>
          {/* Timer Right */}
          <div className="w-full md:w-1/2 flex justify-end">
            <CountdownTimer />
          </div>
        </div>
      </div>
      </section>

       
    </>
  );
}

