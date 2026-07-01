import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/eventConfig";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date from configuration
    const targetDate = new Date(EVENT_CONFIG.countdownTarget).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col items-center lg:items-start w-full mb-10"
    >
      {/* Target Date Heading */}
      <span className="font-space font-bold text-xs uppercase tracking-[0.2em] text-brand-gold mb-3 block">
        Event Date: {EVENT_CONFIG.dateFormatted}
      </span>

      {/* Timer Blocks */}
      <div className="flex gap-3 md:gap-4 mb-5">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-sm mb-2 transition-colors duration-500">
              <span className="font-cormorant font-bold text-2xl md:text-3xl text-brand-navy dark:text-brand-gold-pale">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Event Details underneath */}
      <div className="bg-brand-gold/10 dark:bg-brand-gold/5 border border-brand-gold/30 rounded-xl px-5 py-3.5 flex items-center justify-center gap-3 w-full max-w-[340px] shadow-sm">
        <span className="text-brand-gold text-lg md:text-xl">⏰</span>
        <p className="font-inter text-xs md:text-sm text-brand-navy dark:text-brand-gold-pale font-medium tracking-wide">
          Thanksgiving: <span className="font-bold">{EVENT_CONFIG.thanksgivingTime}</span> <span className="mx-1 md:mx-2 opacity-30">|</span> Reception: <span className="font-bold">{EVENT_CONFIG.receptionTime}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
