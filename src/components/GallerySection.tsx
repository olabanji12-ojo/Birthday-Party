import { motion, type Variants } from "framer-motion";

const GallerySection = () => {
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
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      className: "md:col-span-2 md:row-span-2",
      tag: "Legacy",
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
      className: "",
    },
    {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      className: "md:row-span-2",
      tag: "Family",
    },
    {
      src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600&auto=format&fit=crop",
      className: "md:col-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
      className: "",
    },
    {
      src: "https://images.unsplash.com/photo-1519222970733-43c222e9649b?q=80&w=600&auto=format&fit=crop",
      className: "",
    },
    {
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6be?q=80&w=600&auto=format&fit=crop",
      className: "",
    },
  ];

  return (
    <section className="relative bg-brand-navy-light py-24 px-6 overflow-hidden">
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
          <h2 className="font-cormorant text-brand-gold-pale leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
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
          className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-4"
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden border border-brand-gold/25 group cursor-pointer ${img.className} min-h-[200px] md:min-h-0`}
            >
              {/* Image */}
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={img.src} 
                alt={`Moment ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500"
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
    </section>
  );
};

export default GallerySection;
