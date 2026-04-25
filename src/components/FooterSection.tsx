import { motion, type Variants } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const FooterSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-brand-navy pt-24 pb-12 px-6 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-[700px] mx-auto text-center"
      >
        {/* Top Content */}
        <motion.div variants={itemVariants} className="mb-10">
          <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 block">
            Contact
          </span>
          <h2 className="font-cormorant text-brand-gold-pale leading-tight" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
            We Look Forward to Celebrating With You
          </h2>
        </motion.div>

        {/* Contact Info Block */}
        <motion.div variants={itemVariants} className="space-y-4 mb-16">
          <p className="font-inter text-brand-gold-pale/80 text-[15px] mb-2">Event Coordinator</p>
          
          <div className="flex flex-col items-center gap-3">
            <a 
              href="tel:+234800000000" 
              className="flex items-center gap-2 font-inter text-brand-gold-pale hover:text-brand-gold transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>+234 (0) 800 000 0000</span>
            </a>
            
            <a 
              href="https://wa.me/234800000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-brand-gold-pale hover:text-brand-gold transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="h-[1px] w-[40px] bg-brand-gold/40 mx-auto mb-12" 
        />

        {/* Bottom Footer */}
        <motion.div variants={itemVariants} className="space-y-2 opacity-40">
          <p className="font-inter text-[12px] text-brand-gold-pale font-light tracking-widest">
            © 2025 BIG DADDY CELEBRATION
          </p>
          <p className="font-inter text-[10px] text-brand-gold-pale tracking-widest uppercase">
            Crafted with Care
          </p>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default FooterSection;
