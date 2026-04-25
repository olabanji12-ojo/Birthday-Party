import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const GiftSection = () => {
  const [copied, setCopied] = useState(false);
  const accountNumber = "0123456789"; // Placeholder

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <section className="relative bg-brand-navy-light py-24 px-6 overflow-hidden">
      <div className="max-w-[700px] mx-auto text-center">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 block">
            Gift
          </span>
          <h2 className="font-cormorant text-brand-gold-pale leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 48px)" }}>
            A Thoughtful Gesture
          </h2>
          <p className="font-inter text-brand-gold-pale/60 text-sm md:text-base max-w-[500px] mx-auto">
            Your presence is the greatest gift, but if you wish to give, it is warmly appreciated.
          </p>
          <div className="h-[2px] w-[60px] bg-brand-gold mx-auto mt-6" />
        </motion.div>

        {/* Gift Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 bg-white/[0.03] border border-brand-gold/30 rounded-[30px] p-10 md:p-14 backdrop-blur-sm relative"
        >
          {/* Bank Details Grid */}
          <div className="flex flex-col gap-10">
            
            {/* Bank Name */}
            <div className="flex flex-col gap-1">
              <span className="font-inter text-brand-gold text-[10px] uppercase tracking-[0.15em]">Bank Name</span>
              <h3 className="font-cormorant text-brand-gold-pale text-2xl md:text-3xl font-medium">GT BANK</h3>
            </div>

            {/* Account Name */}
            <div className="flex flex-col gap-1">
              <span className="font-inter text-brand-gold text-[10px] uppercase tracking-[0.15em]">Account Name</span>
              <h3 className="font-cormorant text-brand-gold-pale text-2xl md:text-3xl font-medium tracking-wide">
                Solomon Olusegun Ojo
              </h3>
            </div>

            {/* Account Number */}
            <div className="flex flex-col gap-2 items-center">
              <span className="font-inter text-brand-gold text-[10px] uppercase tracking-[0.15em]">Account Number</span>
              <div className="flex items-center gap-4 bg-brand-navy/40 px-6 py-3 rounded-2xl border border-brand-gold/10 group">
                <h3 className="font-cormorant text-brand-gold-pale text-3xl md:text-4xl font-bold tracking-[0.1em]">
                  {accountNumber}
                </h3>
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-full border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                  aria-label="Copy account number"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-inter text-[10px] text-brand-gold-light mt-1"
                >
                  Number Copied to Clipboard
                </motion.span>
              )}
            </div>

          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <div className="w-12 h-12 border-t-2 border-r-2 border-brand-gold rounded-tr-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 p-4 opacity-20">
            <div className="w-12 h-12 border-b-2 border-l-2 border-brand-gold rounded-bl-3xl" />
          </div>
        </motion.div>

        {/* Closing Quote from Brief */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-20 px-4"
        >
          <p className="font-playfair italic text-brand-gold-pale/40 text-sm tracking-widest uppercase mb-4">
            Thank You
          </p>
          <div className="h-[0.5px] w-full max-w-[300px] bg-brand-gold/20 mx-auto" />
        </motion.div>

      </div>
    </section>
  );
};

export default GiftSection;
