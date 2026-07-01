
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/eventConfig";
import { firePoppers } from "../utils/firePoppers";
import CountdownTimer from "./CountdownTimer";

const heroImage = "https://res.cloudinary.com/dvgaluxit/image/upload/q_auto/f_auto/v1781529585/_FMD9554__2.jpg_rcqhk6.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#FAFAFA] dark:bg-brand-navy transition-colors duration-500 overflow-hidden flex items-center pt-32 pb-24 lg:pt-24 lg:pb-0">

      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-space text-brand-navy dark:text-white font-bold leading-[1.05] tracking-tight mb-6" 
            style={{ fontSize: "clamp(48px, 6vw, 76px)" }}
          >
            Celebrate & Rejoice,<br />
            Solomon @ 70
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 leading-relaxed"
          >
            From the first day to seventy years of grace. Join us for an unforgettable evening of joy, thanksgiving, and celebration as we mark an extraordinary life.
          </motion.p>

          <CountdownTimer />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a 
              href="#rsvp"
              onClick={() => firePoppers("hero")}
              className="bg-brand-gold text-white px-10 md:px-12 py-4 rounded-xl font-space font-bold tracking-wide text-sm shadow-[0_10px_30px_-10px_rgba(201,168,76,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(201,168,76,0.8)] hover:-translate-y-1 transition-all"
            >
              RSVP Now!
            </a>
            <a 
              href="#about"
              className="flex items-center justify-center bg-transparent text-brand-navy dark:text-white border-2 border-brand-navy/10 dark:border-white/20 px-10 md:px-12 py-3.5 rounded-xl font-space font-bold tracking-wide text-sm hover:bg-brand-navy/5 dark:hover:bg-white/5 hover:-translate-y-1 transition-all"
            >
              About
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition (PartyHub Style) */}
        <div className="relative w-full h-[450px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0 order-1 lg:order-2">
          
          {/* Background Rotated Shapes */}
          <motion.div 
            initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -12, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute w-[80%] h-[80%] bg-brand-gold rounded-[30px] md:rounded-[40px] z-0 shadow-xl"
          />
          <motion.div 
            initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 6, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute w-[75%] h-[85%] bg-blue-50 dark:bg-brand-navy-light backdrop-blur-md rounded-[30px] md:rounded-[40px] z-0 shadow-lg border border-black/5 dark:border-white/10"
          />

          {/* Central Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 w-[65%] lg:w-[70%] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white dark:border-brand-navy"
          >
            <img src={heroImage} alt="Celebration Cake" className="w-full h-full object-cover" />
          </motion.div>

          {/* Floating Card 1: Top Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-[5%] lg:top-[10%] left-[0%] z-20 bg-white dark:bg-brand-navy-light rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 md:gap-4 animate-[float_4s_ease-in-out_infinite]"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg md:text-xl">
              🎊
            </div>
            <div>
              <p className="font-space font-bold text-xs md:text-sm text-brand-navy dark:text-white">Save the Date</p>
              <p className="font-inter text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{EVENT_CONFIG.dateFormatted}</p>
            </div>
          </motion.div>

          {/* Floating Card 2: Top Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute top-[20%] lg:top-[25%] -right-[2%] lg:-right-[10%] z-20 bg-white dark:bg-brand-navy-light rounded-full px-4 py-2 md:px-6 md:py-3 shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-2 md:gap-3 animate-[float_5s_ease-in-out_infinite_reverse]"
          >
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs md:text-sm font-bold">
              ✓
            </div>
            <p className="font-space font-bold text-xs md:text-sm text-brand-navy dark:text-white">RSVP Confirmed</p>
          </motion.div>

          {/* Floating Card 3: Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-[10%] lg:bottom-[10%] left-[5%] lg:-left-[5%] z-20 bg-white dark:bg-brand-navy-light rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 md:gap-4 animate-[float_4.5s_ease-in-out_infinite]"
          >
            <img src="https://res.cloudinary.com/dvgaluxit/image/upload/v1781529517/_FMD9655__2.jpg_l4s5xx.jpg" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
            <div>
              <p className="font-space font-bold text-xs md:text-sm text-brand-navy dark:text-white">Dress Code</p>
              <p className="font-inter text-[10px] md:text-xs text-gray-500 dark:text-gray-400">White & Blue Gele/Cap ✨</p>
            </div>
          </motion.div>

          {/* Floating Badge: Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
            className="absolute bottom-[15%] lg:bottom-[20%] -right-[2%] lg:-right-[5%] z-20 w-14 h-14 md:w-16 md:h-16 bg-brand-gold rounded-full shadow-lg flex flex-col items-center justify-center text-white rotate-12"
          >
            <span className="text-lg md:text-xl leading-none">⭐</span>
            <span className="font-space font-bold text-xs md:text-sm leading-none mt-1">70</span>
          </motion.div>

        </div>
      </div>
      
      {/* Floating Animation CSS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
