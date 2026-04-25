import { motion, type Variants } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventDetailsSection = () => {
  const headingVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        duration: 0.5,
      },
    },
  };

  const mapVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.5, ease: "easeOut" as const },
    },
  };

  const cardContent = [
    {
      icon: <Calendar className="w-6 h-6 text-brand-gold" />,
      label: "Date",
      value: "October 17",
      sub: "2025",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-gold" />,
      label: "Time",
      value: "TBA",
      sub: "To be announced",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-gold" />,
      label: "Venue",
      value: "Lagos Country Club",
      sub: "Lagos, Nigeria",
    },
  ];

  return (
    <section className="relative bg-brand-navy-light py-24 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        
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
          <h2 className="font-cormorant text-brand-gold-pale leading-tight mb-6" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
            Join Us for the Celebration
          </h2>
          <div className="h-[2px] w-[60px] bg-brand-gold mx-auto" />
        </motion.div>

        {/* Info Cards Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {cardContent.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-white/[0.04] border border-brand-gold/30 hover:border-brand-gold rounded-[20px] p-8 flex flex-col items-center text-center gap-4 transition-colors duration-300 group"
            >
              {/* Icon Container */}
              <motion.div 
                onAnimationComplete={() => {}} // Placeholder for pulse if needed or just handle via child
                className="w-14 h-14 bg-brand-gold/10 border border-brand-gold/50 rounded-full flex items-center justify-center"
              >
                <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (idx * 0.15), duration: 0.3 }}
                >
                    {card.icon}
                </motion.div>
              </motion.div>

              <div className="flex flex-col gap-1">
                <span className="font-inter text-brand-gold text-[10px] md:text-xs uppercase tracking-[0.1em]">
                  {card.label}
                </span>
                <h3 className="font-cormorant text-brand-gold-pale text-2xl md:text-3xl font-semibold">
                  {card.value}
                </h3>
                <span className="font-inter text-brand-gold-pale/50 text-sm">
                  {card.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map + Directions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={mapVariants}
          className="w-full mt-12 text-center"
        >
          <div className="rounded-[16px] overflow-hidden border border-brand-gold/30 outline outline-1 outline-brand-gold/40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.4299!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLagos+Country+Club!5e0!3m2!1sen!2sng!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://maps.google.com/?q=Lagos+Country+Club+Lagos+Nigeria", "_blank")}
            className="mt-8 bg-transparent border border-brand-gold text-brand-gold px-10 py-3 rounded-full font-inter text-sm tracking-wide transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy"
          >
            Get Directions →
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default EventDetailsSection;
