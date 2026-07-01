import { motion, type Variants } from "framer-motion";
import { Phone, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { EVENT_CONFIG } from "../config/eventConfig";

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
    <footer className="relative bg-white dark:bg-brand-navy transition-colors duration-500 pt-24 pb-12 px-6 overflow-hidden">
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
          <h2 className="font-cormorant text-brand-navy dark:text-brand-gold-pale transition-colors duration-500 leading-tight" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
            We Look Forward to Celebrating With You
          </h2>
        </motion.div>

        {/* Contact Info Block */}
        <motion.div variants={itemVariants} className="space-y-6 mb-16">
          <p className="font-inter text-gray-600 dark:text-brand-gold-pale/80 transition-colors duration-500 text-[15px] mb-2 font-semibold">Event Coordinators</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            {EVENT_CONFIG.contacts.map((contact, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <span className="font-space text-xs font-bold text-brand-gold uppercase tracking-wider">{contact.name}</span>
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href={`tel:${contact.value}`} 
                    className="flex items-center gap-2 font-inter text-gray-700 dark:text-brand-gold-pale hover:text-brand-gold transition-colors duration-300 text-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{contact.displayPhone}</span>
                  </a>
                  
                  <a 
                    href={`https://wa.me/${contact.value}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-inter text-gray-700 dark:text-brand-gold-pale hover:text-brand-gold transition-colors duration-300 text-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="h-[1px] w-[40px] bg-brand-gold/40 mx-auto mb-12" 
        />

        {/* Bottom Footer */}
        <motion.div variants={itemVariants} className="space-y-2 opacity-40">
          <div className="text-[10px] text-gray-500 dark:text-gray-400 tracking-widest">
            © {EVENT_CONFIG.copyrightYear} MR. SOLOMON OLUSEGUN OJO CELEBRATION
          </div>
          <p className="font-inter text-[10px] text-gray-500 dark:text-brand-gold-pale transition-colors duration-500 tracking-widest uppercase">
            Built By Olabanji Ojo
          </p>
          <Link to="/admin" className="absolute bottom-4 right-4 text-brand-gold opacity-100 hover:text-brand-navy dark:hover:text-white transition-colors p-2" title="Admin Access">
            <Lock className="w-4 h-4" />
          </Link>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default FooterSection;
