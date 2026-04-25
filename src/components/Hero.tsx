import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const Hero = () => {
  const [init, setInit] = useState(false);

  // Initialize tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 0 },
        color: { value: ["#c9a84c", "#e8c96d", "#f5e6c0"] },
        shape: { type: "square" },
        opacity: { value: 1 },
        size: { value: { min: 2, max: 4 } },
        move: {
          enable: true,
          gravity: { enable: true, acceleration: 15 },
          speed: { min: 10, max: 25 },
          decay: 0.1,
          direction: "none",
          straight: false,
          outModes: { default: "destroy" },
        },
      },
      emitters: {
        direction: "top",
        life: { count: 1, duration: 0.1, delay: 0.4 },
        rate: { delay: 0, quantity: 100 },
        size: { width: 0, height: 0 },
        position: { x: 50, y: 50 },
      },
    }),
    []
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-navy flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 hover:scale-100"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy/80" />
      </div>

      {/* Confetti Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-playfair italic text-brand-gold-pale tracking-[0.3em] uppercase text-sm mb-6"
        >
          You are cordially invited to celebrate
        </motion.p>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <h1 className="font-cormorant text-7xl md:text-9xl text-white leading-tight mb-2 drop-shadow-2xl">
                Solomon Olusegun Ojo
            </h1>
            <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-brand-gold" />
                <span className="font-cormorant text-4xl md:text-5xl text-brand-gold">@ 70</span>
                <div className="h-[1px] w-12 bg-brand-gold" />
            </div>
        </motion.div>

        {/* Countdown */}
        <div className="mt-12 mb-12">
            <Countdown targetDate="2025-10-17T00:00:00" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-gold text-brand-navy px-12 py-4 rounded-full font-inter font-bold tracking-widest uppercase text-sm transition-all hover:bg-brand-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
        >
          RSVP Now
        </motion.button>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 border border-brand-gold/30 rounded-full w-6 h-10 flex justify-center p-1"
      >
        <div className="w-1 h-2 bg-brand-gold rounded-full" />
      </motion.div>
    </section>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-6 md:gap-12 justify-center">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Mins" />
      <CountdownItem value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const CountdownItem = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <span className="font-cormorant text-4xl md:text-6xl text-white font-light">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-inter text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-gold-pale mt-1">
      {label}
    </span>
  </div>
);

export default Hero;
