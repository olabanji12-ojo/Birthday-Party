import { useState, useEffect, useRef } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import QRCode from "react-qr-code";
import { EVENT_CONFIG } from "../config/eventConfig";

const EventDetailsSection = () => {
  const [showMap, setShowMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMap && mapContainerRef.current && !mapContainerRef.current.contains(event.target as Node)) {
        setShowMap(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMap]);
  const headingVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const ticketVariants: Variants = {
    hidden: { y: 40, opacity: 0, rotateX: 15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative bg-gray-50 dark:bg-brand-navy-light transition-colors duration-500 py-24 px-6 overflow-hidden perspective-1000">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.12em] mb-4 block">
            Event Details
          </span>
          <h2 className="font-cormorant text-brand-navy dark:text-brand-gold-pale transition-colors duration-500 leading-tight mb-6" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
            Join Us for the Celebration
          </h2>
          <div className="h-[2px] w-[60px] bg-brand-gold mx-auto" />
        </motion.div>

        {/* VIP Ticket */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ticketVariants}
          className="w-full flex flex-col md:flex-row bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-brand-gold/30 rounded-[30px] shadow-2xl dark:shadow-[0_20px_50px_-12px_rgba(201,168,76,0.1)] overflow-hidden relative"
        >
          {/* Decorative Cutouts (Top & Bottom) */}
          <div className="hidden md:block absolute left-[65%] top-[-15px] w-[30px] h-[30px] bg-gray-50 dark:bg-brand-navy-light rounded-full border-b border-gray-200 dark:border-brand-gold/30 z-10 transition-colors duration-500"></div>
          <div className="hidden md:block absolute left-[65%] bottom-[-15px] w-[30px] h-[30px] bg-gray-50 dark:bg-brand-navy-light rounded-full border-t border-gray-200 dark:border-brand-gold/30 z-10 transition-colors duration-500"></div>

          <div className="md:hidden absolute top-[65%] left-[-15px] w-[30px] h-[30px] bg-gray-50 dark:bg-brand-navy-light rounded-full border-r border-gray-200 dark:border-brand-gold/30 z-10 transition-colors duration-500"></div>
          <div className="md:hidden absolute top-[65%] right-[-15px] w-[30px] h-[30px] bg-gray-50 dark:bg-brand-navy-light rounded-full border-l border-gray-200 dark:border-brand-gold/30 z-10 transition-colors duration-500"></div>

          {/* Left Side: Main Details */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative md:w-[65%]">
            <div className="flex justify-between items-start mb-12">
              <div className="bg-brand-gold text-brand-navy font-inter text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
                VIP • ADMIT ONE
              </div>
              <span className="font-space font-bold text-gray-300 dark:text-white/10 text-4xl tracking-tighter transition-colors duration-500">№ 001</span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-cormorant text-brand-navy dark:text-brand-gold-pale transition-colors duration-500 text-3xl md:text-5xl font-semibold mb-2">
                  70th Birthday Celebration
                </h3>
                <p className="font-inter text-gray-500 dark:text-brand-gold-pale/60 text-sm tracking-wide transition-colors duration-500">
                  Honoring the life and legacy of Solomon Olusegun Ojo
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-4">
                <div>
                  <span className="font-inter text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Date</span>
                  <p className="font-space font-bold text-brand-navy dark:text-brand-gold-pale text-xl md:text-2xl transition-colors duration-500">
                    {EVENT_CONFIG.dateFormatted.toUpperCase()}
                  </p>
                </div>
                <div>
                  <span className="font-inter text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Time</span>
                  <div className="font-space font-bold text-brand-navy dark:text-brand-gold-pale text-sm md:text-base transition-colors duration-500 space-y-1">
                    <p>Thanksgiving: {EVENT_CONFIG.thanksgivingTime}</p>
                    <p>Reception: {EVENT_CONFIG.receptionTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Stub */}
          <div className="w-full md:w-[2px] h-[2px] md:h-auto border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-200 dark:border-brand-gold/20 relative my-4 md:my-0 md:mx-0 transition-colors duration-500"></div>

          {/* Right Side: Venue Stub */}
          <div className="w-full md:w-[35%] bg-gray-50/50 dark:bg-black/10 p-8 md:p-10 flex flex-col justify-center items-center text-center transition-colors duration-500">

            <div
              ref={mapContainerRef}
              className="relative w-40 h-40 mb-6 rounded-xl flex items-center justify-center bg-white border border-brand-gold/30 shadow-xl cursor-pointer overflow-hidden group"
              onClick={() => { if (!showMap) setShowMap(true); }}
            >
              <AnimatePresence mode="wait">
                {!showMap ? (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-4 flex items-center justify-center"
                  >
                    <QRCode
                      value="https://maps.google.com/?q=Lagos+Country+Club+Ikeja+Lagos+Nigeria"
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      fgColor="#1E2A3B"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl z-10 pointer-events-none">
                      <span className="text-white font-inter text-xs text-center px-2 font-medium tracking-wide">Tap for Map</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMap(false);
                    }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6335194451737!2d3.3538537750849397!3d6.587647393406321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93a38b555555%3A0x868b446a815779c1!2sLagos%20Country%20Club!5e0!3m2!1sen!2sng!4v1719614400000!5m2!1sen!2sng"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open("https://maps.google.com/?q=Lagos+Country+Club+Ikeja+Lagos+Nigeria", "_blank");
                        }}
                        className="bg-brand-gold text-brand-navy hover:bg-white px-4 py-2 rounded-full font-inter text-xs font-bold shadow-lg transition-colors duration-300 mb-2"
                      >
                        Open Maps
                      </button>
                      <span className="text-white font-inter text-[10px] text-center px-2 font-medium tracking-wide">
                        Tap background to close
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4 w-full">
              <div>
                <span className="font-inter text-brand-gold text-[10px] uppercase tracking-widest block mb-2">Venue</span>
                <p className="font-cormorant font-semibold text-brand-navy dark:text-white text-2xl transition-colors duration-500">
                  Lagos Country Club, Ikeja
                </p>
                <p className="font-inter text-gray-500 dark:text-gray-400 text-xs mt-1 transition-colors duration-500">
                  Lagos, Nigeria
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://maps.google.com/?q=Lagos+Country+Club+Ikeja+Lagos+Nigeria", "_blank")}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-transparent border border-brand-gold text-brand-gold px-6 py-3 rounded-xl font-inter text-sm tracking-wide transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy group"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </motion.button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default EventDetailsSection;