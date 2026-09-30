"use client";
import Link from 'next/link';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Home.css';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and visual transformations for Hero
  // 1. Grayscale: 100% until 40%, fades to 0% by 80%
  const grayscale = useTransform(scrollYProgress, [0, 0.4, 0.8], ["100%", "100%", "0%"]);
  // 2. Brightness: Very dark initially, brightens progressively
  const brightness = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.1, 0.15, 0.7, 0.5]);
  // 3. Scale: Deep zoom effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  // Expanded Story Narrative (Cinematic Drift Timings)
  // Each text gets a 20% chunk of the scroll.
  // - Enter (5%): Fade in, slide up from 50px to 0px
  // - Drift (10%): Hold opacity, slowly drift up to -30px
  // - Exit (5%): Fade out, slide up to -80px

  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], ['50px', '0px', '-30px', '-80px']);

  const text2Opacity = useTransform(scrollYProgress, [0.20, 0.25, 0.35, 0.40], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.20, 0.25, 0.35, 0.40], ['50px', '0px', '-30px', '-80px']);

  const text3Opacity = useTransform(scrollYProgress, [0.40, 0.45, 0.55, 0.60], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.40, 0.45, 0.55, 0.60], ['50px', '0px', '-30px', '-80px']);

  const text4Opacity = useTransform(scrollYProgress, [0.60, 0.65, 0.75, 0.80], [0, 1, 1, 0]);
  const text4Y = useTransform(scrollYProgress, [0.60, 0.65, 0.75, 0.80], ['50px', '0px', '-30px', '-80px']);

  // Final Hero Content (Enters at 80%, stays visible)
  const finalOpacity = useTransform(scrollYProgress, [0.80, 0.90, 1], [0, 1, 1]);
  const finalY = useTransform(scrollYProgress, [0.80, 0.90, 1], ['50px', '0px', '0px']);

  // Parallax setup for remaining page elements
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"]
  });

  // Showcase elements parallax
  const showcaseY1 = useTransform(pageScroll, [0, 1], [100, -100]);
  const showcaseY2 = useTransform(pageScroll, [0, 1], [200, -200]); // Moves faster
  
  // Narrative image parallax
  const narrativeImageY = useTransform(pageScroll, [0, 1], [150, -150]);
  const ctaBgY = useTransform(pageScroll, [0, 1], ["0%", "50%"]);

  return (
    <div className="home-page" ref={pageRef}>
      {/* Expanded Scrollytelling Hero Section */}
      <section ref={containerRef} className="scroll-hero-container">
        <div className="sticky-viewport">
          
          <motion.div 
            className="hero-parallax-bg"
            style={{ 
              backgroundImage: `url('/images/neon_astronaut.jpg')`,
              filter: useTransform(() => `grayscale(${grayscale.get()}) brightness(${brightness.get()})`),
              scale
            }}
          />
          
          <div className="hero-overlay-gradient"></div>

          <div className="story-container container">
            <div className="story-text-wrapper">
              <motion.h2 className="story-text" style={{ opacity: text1Opacity, y: text1Y }}>
                Before the light...
              </motion.h2>
            </div>

            <div className="story-text-wrapper">
              <motion.h2 className="story-text" style={{ opacity: text2Opacity, y: text2Y }}>
                Spaces were just concrete and silence.
              </motion.h2>
            </div>

            <div className="story-text-wrapper">
              <motion.h2 className="story-text" style={{ opacity: text3Opacity, y: text3Y, color: '#00ff73', textShadow: '0 0 20px rgba(0,255,115,0.4)' }}>
                Then came the pulse.
              </motion.h2>
            </div>

            <div className="story-text-wrapper">
              <motion.h2 className="story-text" style={{ opacity: text4Opacity, y: text4Y }}>
                Electricity meets artistry.
              </motion.h2>
            </div>

            <div className="story-text-wrapper">
              <motion.div className="hero-final-content" style={{ opacity: finalOpacity, y: finalY }}>
                <div className="badge glass">Premium Quality Neon</div>
                <h1 className="hero-title">ILLUMINATE<br/>YOUR WORLD.</h1>
                <p className="hero-desc">
                  Bespoke LED neon artistry, handcrafted in Nepal. 
                  Elevate your interior, business, or event with our premium glowing statements.
                </p>
                <div className="hero-actions">
                  <Link href="/shop" className="btn btn-primary">
                    Explore Collection
                  </Link>
                  <Link href="/custom" className="btn btn-secondary">
                    Design Your Own
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Showcase with Parallax Grid */}
      <section className="showcase-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="section-title">Signature Pieces</h2>
              <p className="section-subtitle">Our most coveted designs, ready to ship.</p>
            </div>
            <Link href="/shop" className="view-all-link">
              View All <MoveRight size={20} />
            </Link>
          </motion.div>
          
          <div className="showcase-grid">
            <motion.div style={{ y: showcaseY1 }}>
              <Link href="/shop" className="showcase-card large">
                <div className="showcase-img-wrapper">
                  <img src="/images/neon_good_vibes.jpg" alt="Good Vibes Neon" />
                </div>
                <div className="showcase-info glass">
                  <div>
                    <h3>Good Vibes Only</h3>
                    <p className="price">$299.00</p>
                  </div>
                  <button className="icon-btn" aria-label="View Product"><ArrowRight size={20}/></button>
                </div>
              </Link>
            </motion.div>
            
            <motion.div style={{ y: showcaseY2 }}>
              <Link href="/shop" className="showcase-card">
                <div className="showcase-img-wrapper">
                  <img src="/images/neon_leaf.jpg" alt="Neon Leaf" />
                </div>
                <div className="showcase-info glass">
                  <div>
                    <h3>Monstera Leaf</h3>
                    <p className="price">$189.00</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section with Parallax Image */}
      <section className="narrative-section">
        <div className="container narrative-container">
          <motion.div 
            className="narrative-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.8 }}
          >
            <h2>Crafted with precision.<br/>Built to last.</h2>
            <p>
              We don&apos;t just bend tubes. We create luminous art pieces using advanced 
              LED flex technology that consumes 80% less energy than traditional glass neon, 
              while delivering a sharper, more vibrant glow that lasts for over 50,000 hours.
            </p>
            <ul className="narrative-list">
              <li><Sparkles size={16} /> Museum-grade acrylic backing</li>
              <li><Sparkles size={16} /> Dimmer control included</li>
              <li><Sparkles size={16} /> 2-year comprehensive warranty</li>
            </ul>
          </motion.div>
          
          <div className="narrative-image-wrapper">
            <motion.div className="narrative-image" style={{ y: narrativeImageY }}>
              <img src="/images/neon_good_vibes.jpg" alt="Craftsmanship" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Custom Design Banner with Background Parallax */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-banner-wrapper">
            <motion.div 
              className="cta-banner-bg" 
              style={{ 
                backgroundImage: `url('/images/neon_astronaut.jpg')`,
                y: ctaBgY
              }} 
            />
            <div className="cta-overlay"></div>
            <motion.div 
              className="cta-content"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Your Vision, <br/>In Lights.</h2>
              <p>Try our interactive custom builder to visualize your text as a premium neon sign.</p>
              <Link href="/custom" className="btn btn-primary mt-4">Launch Builder</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
