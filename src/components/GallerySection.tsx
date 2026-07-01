import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const images = [
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/q_auto/f_auto/v1781529660/_FMD9433__2.jpg_p6c3bq.jpg",
      tag: "Legacy",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529592/_FMD9443__2.jpg_mspecn.jpg",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529530/_FMD9457__2.jpg_pnp3e2.jpg",
      tag: "Family",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529540/_FMD9465__2.jpg_zyewpv.jpg",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/q_auto/f_auto/v1781529609/_FMD9492__2.jpg_grizpj.jpg",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529599/_FMD9509__2.jpg_jfsztf.jpg",
    },
    {
      src: "https://res.cloudinary.com/dvgaluxit/image/upload/v1781529541/_FMD9521__2.jpg_ra7xi4.jpg",
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <section id="gallery" className="relative bg-gray-50 dark:bg-brand-navy-light transition-colors duration-500 py-24 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Section Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.12em] mb-4 block">
            Gallery
          </span>
          <h2 className="font-cormorant text-brand-navy dark:text-brand-gold-pale transition-colors duration-500 leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
            Moments Through the Years
          </h2>
          <div className="h-[2px] w-[60px] bg-brand-gold mx-auto" />
        </motion.div>

        {/* Editorial Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden border border-brand-gold/25 group cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImageIndex(idx)}
            >
              {/* Image */}
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={img.src} 
                alt={`Moment ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Tag (if any) */}
              {img.tag && (
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-brand-gold/20 backdrop-blur-md border border-brand-gold/50 px-3 py-1 rounded-full">
                    <span className="font-inter text-brand-gold text-[10px] tracking-widest uppercase">
                      {img.tag}
                    </span>
                  </div>
                </div>
              )}

              {/* Selection Glow */}
              <div className="absolute inset-0 group-hover:shadow-[inset_0_0_0_1px_rgba(201,168,76,0.5)] transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-brand-gold transition-colors z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-4 md:left-10 text-white/70 hover:text-brand-gold transition-colors z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="absolute right-4 md:right-10 text-white/70 hover:text-brand-gold transition-colors z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] w-full px-4 md:px-24 flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImageIndex].src}
                alt={`Moment ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
