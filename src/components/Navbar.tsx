"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag, Menu, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'Custom Studio', path: '/custom' },
    { name: 'Contact', path: '/contact' }
  ];

  // Determine active index
  const activeIndex = navItems.findIndex(item => item.path === pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update pill position based on hover or active state
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : null);
    
    if (targetIndex !== null && navRef.current) {
      const navLinks = Array.from(navRef.current.querySelectorAll('.nav-item')) as HTMLElement[];
      const targetLink = navLinks[targetIndex];
      
      if (targetLink) {
        setPillStyle({
          width: targetLink.offsetWidth,
          transform: `translateX(${targetLink.offsetLeft}px)`,
          opacity: 1
        });
      }
    } else {
      setPillStyle({
        opacity: 0
      });
    }
  }, [hoveredIndex, activeIndex, pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-island">
        <div className="navbar-start">
          <Link href="/" className="navbar-brand">
            NEON<span className="brand-dot">.</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <div className="nav-links" ref={navRef}>
            <div className="nav-pill" style={pillStyle}></div>
            {navItems.map((item, index) => (
              <Link 
                key={item.name}
                href={item.path} 
                className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-end">
          <button className="action-btn" aria-label="Search">
            <Search size={18} strokeWidth={2} />
            <div className="icon-glow"></div>
          </button>
          <button className="action-btn" aria-label="Wishlist">
            <Heart size={18} strokeWidth={2} />
            <div className="icon-glow"></div>
          </button>
          <button className="action-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={2} />
            <span className="cart-indicator">2</span>
            <div className="icon-glow"></div>
          </button>
          <button className="action-btn menu-btn-mobile" aria-label="Menu">
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
