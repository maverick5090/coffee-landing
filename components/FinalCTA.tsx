'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] to-[#2D1810]" />

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F9C8F]/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#D4A574]/15 rounded-full blur-[80px]"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[#4F9C8F] text-sm tracking-[0.3em] uppercase font-[var(--font-inter)]">
            ✦ Start Your Journey ✦
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] font-bold text-[#F5E6D3] mb-6 leading-tight"
        >
          Find the Perfect
          <br />
          <span className="bg-gradient-to-r from-[#D4A574] to-[#4F9C8F] bg-clip-text text-transparent">
            Coffee for You
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-[#C9B8A0] mb-12 font-[var(--font-inter)] font-light max-w-2xl mx-auto"
        >
          Experience the art of coffee craftsmanship. From single-origin beans
          to masterful blends, your perfect cup awaits.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(79, 156, 143, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="px-16 py-5 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-xl font-semibold font-[var(--font-inter)] shadow-2xl transition-shadow duration-300 cursor-pointer"
        >
          Explore Full Menu
        </motion.button>

        {/* Decorative Sparkle */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="mt-16 text-[#D4A574]/60 text-4xl"
        >
          ✦
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A0F0A] to-transparent" />
    </section>
  );
}
