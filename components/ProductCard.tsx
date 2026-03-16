'use client';

import { motion } from 'framer-motion';
import { CoffeeProduct } from '@/data/products';
import { getAssetPath } from '@/lib/getAssetPath';

interface ProductCardProps {
  product: CoffeeProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="group relative bg-[#3D2820]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#5A4034] hover:border-[#4F9C8F] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#4F9C8F]/10"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#4F9C8F]/0 to-[#4F9C8F]/0 group-hover:from-[#4F9C8F]/5 group-hover:to-transparent transition-all duration-500" />

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(product.rating)
                    ? 'text-[#FFD700]'
                    : 'text-[#5A4034]'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[#F5E6D3] font-semibold text-sm font-[var(--font-inter)]">
            {product.rating}
          </span>
        </div>

        {/* Coffee Image */}
        <div className="w-full h-56 bg-[#2D1810] rounded-xl mb-5 overflow-hidden">
          <img
            src={getAssetPath(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-3 py-1 rounded-full bg-[#2D1810] text-[#C9B8A0] border border-[#5A4034]/50 font-[var(--font-inter)]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-[#F5E6D3] mb-3">
          {product.name}
        </h3>
        <p className="text-sm text-[#C9B8A0] mb-5 line-clamp-2 font-[var(--font-inter)] leading-relaxed">
          {product.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5A4034] to-transparent mb-5" />

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-[#F5E6D3] font-[var(--font-inter)]">
            {product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] flex items-center justify-center shadow-lg hover:shadow-[#4F9C8F]/40 transition-shadow duration-300 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <span className="text-white text-2xl font-bold leading-none">+</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
