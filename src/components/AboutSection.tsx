import { motion, type Variants } from "framer-motion";

const AboutSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemLeftVariants: Variants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const itemRightVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const textFadeUpVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative bg-brand-navy py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col"
        >
          {/* Label */}
          <motion.span 
            variants={itemLeftVariants}
            className="font-inter text-brand-gold text-xs uppercase tracking-[0.2em] mb-4"
          >
            About the Celebrant
          </motion.span>

          {/* Heading */}
          <motion.h2 
            variants={itemLeftVariants}
            className="font-cormorant text-brand-gold-pale leading-tight mb-2"
            style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
          >
            Solomon Olusegun Ojo
          </motion.h2>

          {/* Nickname */}
          <motion.span 
            variants={itemLeftVariants}
            className="font-cormorant italic text-brand-gold text-2xl md:text-3xl mb-6"
          >
            "Big Daddy"
          </motion.span>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="h-[2px] w-[60px] bg-brand-gold mb-8"
          />

          {/* Description */}
          <motion.p 
            variants={textFadeUpVariants}
            className="font-inter text-brand-gold-pale/80 text-base md:text-lg leading-relaxed mb-8"
          >
            A man of grace, wisdom, and boundless love. For seven decades, Solomon Olusegun Ojo 
            has been the rock of his family — a father, a leader, and an inspiration to all who know him. 
            His life is a testament to the power of faith, resilience, and the enduring strength of 
            kindness across generations.
          </motion.p>

          {/* Blockquote */}
          <motion.div 
            variants={textFadeUpVariants}
            className="border-l-[3.5px] border-brand-gold pl-6 py-2"
          >
            <p className="font-cormorant italic text-brand-gold text-xl md:text-2xl leading-snug">
              "Seventy years of grace, and still counting."
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column - Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 grid-rows-2 gap-3 h-[400px] md:h-[520px]"
        >
          {/* Photo 1 - Main Portrait */}
          <motion.div 
            variants={itemRightVariants}
            className="relative col-span-1 row-span-2 rounded-[20px] overflow-hidden border border-brand-gold/20 group"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Solomon Portrait"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>

          {/* Photo 2 - Candid */}
          <motion.div 
            variants={itemRightVariants}
            className="relative col-span-1 row-span-1 rounded-[20px] overflow-hidden border border-brand-gold/20 group"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop"
              alt="Candid moment"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>

          {/* Photo 3 - Celebration */}
          <motion.div 
            variants={itemRightVariants}
            className="relative col-span-1 row-span-1 rounded-[20px] overflow-hidden border border-brand-gold/20 group"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
              alt="Celebration moment"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            
            {/* 70 Years Tag */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-brand-navy/80 backdrop-blur-md border border-brand-gold px-3 py-1 rounded-full">
                <span className="text-[10px] text-brand-gold font-bold tracking-widest uppercase">
                  70 Years
                </span>
              </div>
            </div>

            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
