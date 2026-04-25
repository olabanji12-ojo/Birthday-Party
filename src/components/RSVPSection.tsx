import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { firePoppers } from "../utils/firePoppers";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import VirtualTicket from "./VirtualTicket";

const RSVPSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    attendance: "yes",
    guests: "1",
    message: "",
    songRequest: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Firebase
      const docRef = await addDoc(collection(db, "rsvps"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });

      setTicketId(docRef.id);

      // Trigger Success State
      setSubmitted(true);
      
      // Trigger Celebration!
      firePoppers("rsvp");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputClasses = 
    "w-full bg-white/5 border border-brand-gold/30 rounded-xl px-5 py-4 text-brand-gold-pale font-inter focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all placeholder:text-brand-gold-pale/30";

  return (
    <section id="rsvp" className="relative bg-brand-navy py-24 px-6 overflow-hidden">
      <div className="max-w-[700px] mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <span className="font-inter text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 block">
                  RSVP
                </span>
                <h2 className="font-cormorant text-brand-gold-pale leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 48px)" }}>
                  Reserve Your Spot
                </h2>
                <p className="font-inter text-brand-gold-pale/60 text-sm md:text-base">
                  Kindly confirm your attendance to help us plan better.
                </p>
                <div className="h-[2px] w-[60px] bg-brand-gold mx-auto mt-6" />
              </div>

              {/* Form Container */}
              <div className="bg-white/[0.03] border border-brand-gold/20 rounded-[30px] p-8 md:p-12 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className={inputClasses}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+234 ..."
                        className={inputClasses}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className={inputClasses}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </motion.div>

                  {/* Attendance & Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    <motion.div variants={itemVariants} className="flex flex-col gap-4">
                      <label className="block text-brand-gold text-[10px] uppercase tracking-wider ml-1">Will you attend?</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="attendance" 
                            value="yes"
                            checked={formData.attendance === "yes"}
                            onChange={() => setFormData({...formData, attendance: "yes"})}
                            className="w-5 h-5 accent-brand-gold cursor-pointer"
                          />
                          <span className="text-brand-gold-pale group-hover:text-brand-gold transition-colors">Yes, I'll be there</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="attendance" 
                            value="no"
                            checked={formData.attendance === "no"}
                            onChange={() => setFormData({...formData, attendance: "no"})}
                            className="w-5 h-5 accent-brand-gold cursor-pointer"
                          />
                          <span className="text-brand-gold-pale group-hover:text-brand-gold transition-colors">Sadly, no</span>
                        </label>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Number of Guests</label>
                      <select 
                        className={`${inputClasses} bg-[#1a1f45]`}
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Message for Solomon</label>
                    <textarea 
                      rows={3}
                      placeholder="Write a warm note..."
                      className={`${inputClasses} resize-none`}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </motion.div>

                  {/* Song Request */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-brand-gold text-[10px] uppercase tracking-wider mb-2 ml-1">Song Request (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="What should the DJ play?"
                      className={inputClasses}
                      onChange={(e) => setFormData({...formData, songRequest: e.target.value})}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={itemVariants} className="mt-4">
                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-brand-gold text-brand-navy py-5 rounded-full font-inter font-bold tracking-widest uppercase transition-all shadow-[0_10px_20px_-10px_rgba(201,168,76,0.3)] hover:brightness-110 active:scale-95 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Attendance"}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-8 bg-white/[0.03] border border-brand-gold/20 rounded-[40px] backdrop-blur-md"
            >
              <h2 className="font-cormorant text-brand-gold text-5xl md:text-6xl mb-6">
                🎉 You’re on the list!
              </h2>
              <p className="font-inter text-brand-gold-pale/80 text-lg md:text-xl max-w-[500px] mx-auto leading-relaxed">
                Thank you for confirming your attendance. Below is your official virtual invitation.
              </p>

              {/* Virtual Ticket Component */}
              <VirtualTicket guestName={formData.fullName} ticketId={ticketId} />

              <div className="mt-12">
                <p className="font-cormorant italic text-brand-gold-pale/40 text-sm tracking-widest">
                  See you on October 17th
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVPSection;
