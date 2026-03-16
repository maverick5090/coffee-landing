'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { coffeeProducts } from '@/data/products';

export default function ProductShowcase() {
  return (
    <section id="products" className="py-24 px-4 md:px-8 relative">
      {/* Coffee Splash Banner */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative h-64 md:h-72 mb-16 rounded-3xl overflow-hidden max-w-7xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2418] via-[#4D3428] to-[#3D2418]" />
        <img
          src="/coffee/splash-banner.jpg"
          alt="Coffee Splash"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />

        {/* Floating Coffee Beans - deterministic positions to avoid hydration mismatch */}
        {[
          { yAmp: -28, xAmp: 12, rot: 240, dur: 3.5, topPct: 30 },
          { yAmp: -32, xAmp: -8, rot: 300, dur: 4.2, topPct: 45 },
          { yAmp: -25, xAmp: 15, rot: 210, dur: 5.0, topPct: 35 },
          { yAmp: -30, xAmp: -14, rot: 270, dur: 3.8, topPct: 50 },
          { yAmp: -35, xAmp: 10, rot: 330, dur: 4.5, topPct: 28 },
          { yAmp: -27, xAmp: -18, rot: 250, dur: 5.5, topPct: 42 },
          { yAmp: -33, xAmp: 6, rot: 290, dur: 3.2, topPct: 38 },
          { yAmp: -29, xAmp: -12, rot: 260, dur: 4.8, topPct: 55 },
        ].map((bean, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [0, bean.yAmp, 0],
              x: [0, bean.xAmp, 0],
              rotate: [0, bean.rot, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: bean.dur,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            className="absolute w-6 h-6 md:w-8 md:h-8 opacity-50"
            style={{
              left: `${8 + i * 12}%`,
              top: `${bean.topPct}%`,
            }}
          >
            <img
              src="/coffee/bean.png"
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              aria-hidden="true"
            />
          </motion.div>
        ))}

        {/* Banner Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-amber-100/60 text-sm tracking-[0.3em] uppercase font-[var(--font-inter)] mb-2">
              Handcrafted with Love
            </p>
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold text-[#F5E6D3]">
              Premium Selection
            </h2>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#4F9C8F] text-sm tracking-[0.3em] uppercase font-[var(--font-inter)] mb-4">
            ✦ Our Menu ✦
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] font-bold text-[#F5E6D3]">
            Signature Blends
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffeeProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
