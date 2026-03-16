'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { getAssetPath } from '@/lib/getAssetPath';

const TOTAL_FRAMES = 40;
const FRAME_PATH = getAssetPath('/frames');

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll progress tracking confined to the hero section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring animation for buttery scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.001,
  });

  // Anti-gravity effect based on scroll velocity
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(
    scrollVelocity,
    [-1, 0, 1],
    [15, 0, -15]
  );

  // Map scroll to frame index (bi-directional)
  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const loadImages = async () => {
      const imagePromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `${FRAME_PATH}/frame_${i}.jpg`;
          img.onload = () => {
            loadedCount++;
            setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
            resolve(img);
          };
          img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
        });
      });

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading frames:', error);
        setLoadFailed(true);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

  // Canvas rendering
  const renderFrame = useCallback(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    // Optimize performance by disabling alpha channel since we use JPGs
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const currentFrame = Math.round(frameIndex.get());
    const clampedFrame = Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1));
    const img = images[clampedFrame];

    if (img) {
      // Responsive canvas sizing - ONLY update if changed to avoid expensive canvas reset and memory allocation
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Calculate scaling (cover fit for fullscreen)
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, [imagesLoaded, images, frameIndex]);

  useEffect(() => {
    if (!imagesLoaded) return;

    let frameRequestId: number;
    let isDrawing = false;

    const draw = () => {
      renderFrame();
      isDrawing = false;
    };

    const handleFrameChange = () => {
      if (!isDrawing) {
        isDrawing = true;
        frameRequestId = requestAnimationFrame(draw);
      }
    };

    const unsubscribe = frameIndex.on('change', handleFrameChange);
    renderFrame(); // Initial render

    const handleResize = () => handleFrameChange();
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      cancelAnimationFrame(frameRequestId);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, renderFrame, frameIndex]);

  // Text overlay animations
  const section1Opacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [1, 1, 1, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const section4Opacity = useTransform(smoothProgress, [0.85, 0.88, 0.95, 1], [0, 1, 1, 0]);

  const section1Y = useTransform(smoothProgress, [0, 0.2], [0, -60]);
  const section2Y = useTransform(smoothProgress, [0.25, 0.5], [40, -40]);
  const section3Y = useTransform(smoothProgress, [0.55, 0.8], [40, -40]);
  const section4Y = useTransform(smoothProgress, [0.85, 1], [40, 0]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Loader Overlay */}
      {(!isMounted || !imagesLoaded) && !loadFailed && (
        <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Coffee cup icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-6xl mb-8"
            >
              ☕
            </motion.div>

            <div className="w-72 h-2 bg-[#2D1810] rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4A574] via-[#4F9C8F] to-[#D4A574] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <p className="text-amber-100/70 text-lg font-[var(--font-inter)]">
              Brewing Experience... {Math.round(loadProgress)}%
            </p>
          </motion.div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {loadFailed ? (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${getAssetPath('/frames/frame_0.jpg')})` }}
          />
        ) : (
          <motion.div style={{ y: yOffset }} className="w-full h-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </motion.div>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/30 via-transparent to-[#1A0F0A]/50 pointer-events-none" />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Section 1: Hero Title */}
          <motion.div
            style={{ opacity: section1Opacity, y: section1Y }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div>
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-[var(--font-playfair)] font-bold text-amber-50 mb-6 tracking-tight leading-none"
                style={{ textShadow: '0 0 60px rgba(212, 165, 116, 0.3)' }}
              >
                Experience
                <br />
                Coffee
              </motion.h1>
              <p className="text-xl md:text-2xl text-amber-100/80 font-[var(--font-inter)] font-light tracking-wide">
                Where every sip defies gravity
              </p>
            </div>
          </motion.div>

          {/* Section 2: Crafted */}
          <motion.div
            style={{ opacity: section2Opacity, y: section2Y }}
            className="absolute inset-0 flex items-center px-8 md:px-16"
          >
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] font-semibold text-amber-50 mb-4 leading-tight"
                style={{ textShadow: '0 0 40px rgba(212, 165, 116, 0.2)' }}
              >
                Crafted to
                <br />
                Perfection
              </h2>
              <p className="text-lg md:text-xl text-amber-100/70 font-[var(--font-inter)] font-light">
                From bean to cup, excellence floats in every drop
              </p>
            </div>
          </motion.div>

          {/* Section 3: Anti-Gravity */}
          <motion.div
            style={{ opacity: section3Opacity, y: section3Y }}
            className="absolute inset-0 flex items-center justify-end px-8 md:px-16"
          >
            <div className="max-w-2xl text-right">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] font-semibold text-amber-50 mb-4 leading-tight"
                style={{ textShadow: '0 0 40px rgba(212, 165, 116, 0.2)' }}
              >
                Anti-Gravity
                <br />
                Flavor
              </h2>
              <p className="text-lg md:text-xl text-amber-100/70 font-[var(--font-inter)] font-light">
                Defying expectations, elevating taste beyond limits
              </p>
            </div>
          </motion.div>

          {/* Section 4: Discover CTA */}
          <motion.div
            style={{ opacity: section4Opacity, y: section4Y }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-[var(--font-playfair)] font-bold text-amber-50 mb-8 leading-tight"
                style={{ textShadow: '0 0 60px rgba(212, 165, 116, 0.3)' }}
              >
                Discover
                <br />
                Your Blend
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold font-[var(--font-inter)] shadow-2xl pointer-events-auto hover:shadow-[#4F9C8F]/40 transition-shadow duration-300"
              >
                Explore Collection ↓
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <p className="text-amber-100/60 text-sm font-[var(--font-inter)] tracking-[0.2em] uppercase">
            Scroll to Explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-amber-100/40 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-3 bg-amber-100/80 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
