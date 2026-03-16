'use client';

import dynamic from 'next/dynamic';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';

// Dynamic imports with SSR disabled to prevent hydration mismatches
// with Framer Motion's useScroll refs and canvas rendering
const HeroCanvasAnimation = dynamic(
  () => import('@/components/HeroCanvasAnimation'),
  {
    ssr: false,
    loading: () => <section className="h-screen bg-[#1A0F0A]" />
  }
);

const ProductShowcase = dynamic(
  () => import('@/components/ProductShowcase'),
  {
    ssr: false,
    loading: () => <section className="min-h-[40vh] bg-[#1A0F0A]" />
  }
);

export default function Home() {
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      {/* Hero: Scroll-Triggered Canvas Animation */}
      <HeroCanvasAnimation />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Feature Highlights Section */}
      <FeatureSection />

      {/* Final Call-to-Action */}
      <FinalCTA />
    </main>
  );
}
