'use client';

import { motion } from 'framer-motion';
import { features } from '@/data/products';

export default function FeatureSection() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-[#2D1810] to-[#1A0F0A] opacity-50" />

      {/* Decorative Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-[#4F9C8F]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#4F9C8F] text-sm tracking-[0.3em] uppercase font-[var(--font-inter)] mb-4">
            ✦ Why Choose Us ✦
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] font-bold text-[#F5E6D3]">
            What Makes Us Special
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Features */}
          <div className="space-y-6 lg:space-y-8">
            {features
              .filter((f) => f.position === 'left')
              .map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
                  className="group bg-[#3D2820]/60 backdrop-blur-sm p-6 rounded-xl border border-[#5A4034]/50 hover:border-[#4F9C8F]/50 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F9C8F]/20 to-[#4F9C8F]/5 flex items-center justify-center mb-4">
                    <span className="text-[#4F9C8F] text-lg">✦</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-[var(--font-playfair)] font-semibold text-[#F5E6D3] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#C9B8A0] font-[var(--font-inter)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
          </div>

          {/* Center: Coffee Cup Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center justify-center order-first lg:order-none"
          >
            <div className="relative">
              {/* Rotating Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-[-20px] bg-gradient-conic from-[#4F9C8F]/20 via-transparent via-[#D4A574]/15 to-[#4F9C8F]/20 rounded-full blur-2xl opacity-60"
              />

              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4F9C8F]/10 to-[#D4A574]/10 rounded-full blur-3xl" />

              <motion.img
                src="/coffee/cup-centered.png"
                alt="Premium Coffee Cup"
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Right Features */}
          <div className="space-y-6 lg:space-y-8">
            {features
              .filter((f) => f.position === 'right')
              .map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
                  className="group bg-[#3D2820]/60 backdrop-blur-sm p-6 rounded-xl border border-[#5A4034]/50 hover:border-[#4F9C8F]/50 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/5 flex items-center justify-center mb-4">
                    <span className="text-[#D4A574] text-lg">✦</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-[var(--font-playfair)] font-semibold text-[#F5E6D3] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#C9B8A0] font-[var(--font-inter)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
