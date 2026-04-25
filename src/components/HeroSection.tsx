import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { firePoppers } from "../utils/firePoppers";

const HeroSection = () => {
  const [init, setInit] = useState(false);

  // Initialize tsParticles for ambient bokeh
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const ambientParticlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        color: { value: ["#c9a84c", "#e8c96d"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: {
          value: { min: 2, max: 5 },
          animation: { enable: true, speed: 2, sync: false },
        },
        move: {
          enable: true,
          direction: "top",
          speed: { min: 0.5, max: 1.5 },
          outModes: { default: "out" },
        },
      },
    }),
    []
  );

  const name = "SOLOMON OLUSEGUN OJO";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center py-20 px-4">
      {/* Background - Step 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]" />
      </motion.div>

      {/* tsParticles Ambient Bokeh - Step 2 */}
      {init && (
        <Particles
          id="heroParticles"
          options={ambientParticlesOptions}
          className="absolute inset-0 z-1 pointer-events-none"
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Subtitle - Step 3 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="font-inter text-white font-light tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8"
        >
          You are cordially invited to celebrate
        </motion.p>

        {/* Name - Step 4 */}
        <div className="flex flex-wrap justify-center gap-x-[0.2em] mb-4">
          {name.split(" ").map((word, wordIdx) => (
            <div key={wordIdx} className="flex whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.6 + (wordIdx * 0.08) + (charIdx * 0.04), // 1.6s start + stagger
                    ease: "easeOut",
                  }}
                  className="font-cormorant text-white drop-shadow-2xl font-bold uppercase leading-tight"
                  style={{ fontSize: "clamp(42px, 10vw, 96px)" }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Space handler if needed, but flex-wrap + gap-x handle it */}
            </div>
          ))}
        </div>

        {/* @70 - Step 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 3.1, // Starts after name finishes (~3.1s)
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          onAnimationComplete={() => {
            // Trigger Flash & Popper
            animate("#age-text", { filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"], textShadow: ["0 0 0px #c9a84c", "0 0 30px #c9a84c", "0 0 0px #c9a84c"] }, { duration: 0.4 });
            firePoppers("hero");
          }}
          className="relative mb-16"
        >
          <h2 
            id="age-text"
            className="font-cormorant text-brand-gold font-bold leading-none"
            style={{ fontSize: "clamp(60px, 12vw, 130px)" }}
          >
            @ 70
          </h2>
        </motion.div>

        {/* Countdown - Step 6 */}
        <Countdown targetDate="2026-05-30T00:00:00" startDelay={3.6} />

        {/* RSVP Button - Step 7 */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 4.2 }}
           className="mt-16"
        >
          <motion.button
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.7 // After reveal
            }}
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-gold text-brand-navy px-14 py-4 rounded-full font-inter font-bold tracking-widest uppercase text-[10px] md:text-xs transition-all shadow-[0_10px_20px_-10px_rgba(201,168,76,0.3)]"
          >
            RSVP Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Countdown = ({ targetDate, startDelay }: { targetDate: string; startDelay: number }) => {
  const [isCounting, setIsCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const targetDateObj = useMemo(() => new Date(targetDate), [targetDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCounting(true);
    }, startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!isCounting) return;

    const calculateTimeLeft = () => {
      const difference = +targetDateObj - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(interval);
  }, [isCounting, targetDateObj]);

  return (
    <div className="flex gap-x-6 md:gap-x-12 justify-center">
      <CountdownItem value={timeLeft.days} label="Days" delay={startDelay} />
      <CountdownItem value={timeLeft.hours} label="Hours" delay={startDelay + 0.15} />
      <CountdownItem value={timeLeft.minutes} label="Mins" delay={startDelay + 0.3} />
      <CountdownItem value={timeLeft.seconds} label="Secs" delay={startDelay + 0.45} />
    </div>
  );
};

const CountdownItem = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString().padStart(2, "0"));

  const isFirstRender = useRef(true);

  useEffect(() => {
    const animation = animate(count, value, {
      duration: isFirstRender.current ? 0.8 : 0.4,
      delay: isFirstRender.current ? delay : 0,
      ease: "easeOut",
    });
    isFirstRender.current = false;
    return animation.stop;
  }, [value, count, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
      className="flex flex-col items-center"
    >
      <motion.span className="font-cormorant text-4xl md:text-7xl text-white font-light min-w-[1.2ch]">
        {rounded}
      </motion.span>
      <span className="font-inter text-[9px] md:text-xs uppercase tracking-[0.25em] text-brand-gold-pale mt-2">
        {label}
      </span>
    </motion.div>
  );
};

export default HeroSection;
