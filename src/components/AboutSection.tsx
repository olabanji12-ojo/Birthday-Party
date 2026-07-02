import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const aboutImages = [
  "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529684/_FMD9349__2.jpg_x1but3.jpg",
  "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529670/_FMD9398__2.jpg_tyaigt.jpg",
  "https://res.cloudinary.com/dvgaluxit/image/upload/q_auto/f_auto/v1781529724/_FMD9327__2.jpg_kl3tek.jpg"
];

const AboutSection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => { 
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? aboutImages.length - 1 : selectedImageIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === aboutImages.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };
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
    <section id="about" className="relative bg-white dark:bg-brand-navy transition-colors duration-500 py-24 px-6 overflow-hidden">
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
            className="font-cormorant text-brand-navy dark:text-brand-gold-pale transition-colors duration-500 leading-tight mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
          >
            Mr. Solomon Olusegun Ojo
          </motion.h2> 

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
            className="font-inter text-gray-700 dark:text-brand-gold-pale/80 transition-colors duration-500 text-base md:text-lg leading-relaxed mb-6"
          >
            A man of grace, wisdom, and boundless love. For seven decades, Solomon Olusegun Ojo
            has been the rock of his family, a husband, father, grandpa, brother, uncle, and an inspiration to all who know him.
            His life is a testament to the power of faith, resilience, and the enduring strength of
            kindness across generations.
          </motion.p>

          {/* Bold Subheading */}
          <motion.h3
            variants={textFadeUpVariants}
            className="font-cormorant font-bold text-brand-navy dark:text-brand-gold text-2xl md:text-3xl tracking-wide mb-8 uppercase"
          >
            A Man of Integrity
          </motion.h3>

          {/* Blockquote */}
          <motion.div
            variants={textFadeUpVariants}
            className="border-l-[3.5px] border-brand-gold pl-6 py-2"
          >
            <p className="font-cormorant italic text-brand-navy dark:text-brand-gold transition-colors duration-500 text-xl md:text-2xl leading-snug">
              "Seventy years of grace, and still counting."
            </p>Is it just one single event time, or is there a schedule? (e.g., 2:00 PM Red Carpet, 3:00 PM Reception)
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
            onClick={() => setSelectedImageIndex(0)}
            className="relative col-span-1 row-span-2 rounded-[20px] overflow-hidden border border-brand-gold/20 group cursor-pointer"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://res.cloudinary.com/dvgaluxit/image/upload/v1781529684/_FMD9349__2.jpg_x1but3.jpg"
              alt="Solomon Portrait"
              className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>

          {/* Photo 2 - Candid */}
          <motion.div
            variants={itemRightVariants}
            onClick={() => setSelectedImageIndex(1)}
            className="relative col-span-1 row-span-1 rounded-[20px] overflow-hidden border border-brand-gold/20 group cursor-pointer"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://res.cloudinary.com/dvgaluxit/image/upload/v1781529670/_FMD9398__2.jpg_tyaigt.jpg"
              alt="Candid moment"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              style={{ objectPosition: "center 20%" }}
            />
            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>

          {/* Photo 3 - Celebration */}
          <motion.div
            variants={itemRightVariants}
            onClick={() => setSelectedImageIndex(2)}
            className="relative col-span-1 row-span-1 rounded-[20px] overflow-hidden border border-brand-gold/20 group cursor-pointer"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://res.cloudinary.com/dvgaluxit/image/upload/q_auto/f_auto/v1781529724/_FMD9327__2.jpg_kl3tek.jpg"
              alt="Celebration moment"
              className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />

            {/* 70 Years Tag */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 dark:bg-brand-navy/80 backdrop-blur-md border border-brand-gold px-3 py-1 rounded-full transition-colors duration-500">
                <span className="text-[10px] text-brand-navy dark:text-brand-gold font-bold tracking-widest uppercase transition-colors duration-500">
                  70 Years
                </span>
              </div>
            </div>

            <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_2px_#c9a84c] transition-all duration-300 rounded-[20px]" />
          </motion.div>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-10 h-10 md:w-14 md:h-14" />
            </button>

            {/* Main Image */}
            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={aboutImages[selectedImageIndex]}
              alt="Gallery Preview"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            <button
              className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-10 h-10 md:w-14 md:h-14" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;