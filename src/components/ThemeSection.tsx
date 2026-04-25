import { motion, type Variants } from "framer-motion";

const ThemeSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const themeCards = [
    {
      label: "Primary",
      title: "Royal Navy",
      sub: "Deep, elegant, and timeless",
      img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Metallic",
      title: "Majestic Gold",
      sub: "A touch of 70-year royalty",
      img: "https://images.unsplash.com/photo-1596751303335-742b50aa8fb9?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Accent",
      title: "Antique Cream",
      sub: "Subtle and refined statements",
      img: "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative bg-brand-navy py-24 px-6 overflow-hidden">
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
            Theme & Dress Code
          </span>
          <h2 className="font-cormorant text-brand-gold-pale leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
            Come Styled for the Occasion
          </h2>
          <div className="h-[2px] w-[60px] bg-brand-gold mx-auto" />
        </motion.div>

        {/* Theme Showcase Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {themeCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="relative h-[220px] md:h-[280px] rounded-2xl overflow-hidden border border-brand-gold/30 group"
            >
              {/* Image Background */}
              <img 
                src={card.img} 
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />

              {/* Card Content (Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-inter text-brand-gold text-[10px] uppercase tracking-wider mb-1 block">
                  {card.label}
                </span>
                <h3 className="font-cormorant text-brand-gold-pale text-2xl font-bold mb-1">
                  {card.title}
                </h3>
                <p className="font-inter text-[12px] text-brand-gold-pale/60">
                  {card.sub}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 group-hover:shadow-[inset_0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Dress Code Highlight Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-[600px] mx-auto bg-white/[0.03] border border-brand-gold/35 rounded-[30px] p-10 md:p-14 text-center relative backdrop-blur-sm shadow-2xl"
        >
          <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 block">
            Dress Code
          </span>
          <h3 className="font-cormorant text-brand-gold-pale text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Navy & Gold
          </h3>
          <p className="font-inter text-brand-gold-pale/70 text-sm md:text-base italic tracking-wide">
            Elegant. Refined. Timeless.
          </p>

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-gold/40 rounded-tl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand-gold/40 rounded-br-lg" />
        </motion.div>

      </div>
    </section>
  );
};

export default ThemeSection;
