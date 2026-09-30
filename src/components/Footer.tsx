"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay in the loop.</h3>
            <p>Exclusive drops, neon inspiration, and studio updates.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={20} /></button>
            </form>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><Link href="/shop">All Neon</Link></li>
                <li><Link href="/shop">Business Signs</Link></li>
                <li><Link href="/shop">Home Decor</Link></li>
                <li><Link href="/shop">Event Hire</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="#">FAQ</Link></li>
                <li><Link href="#">Shipping & Returns</Link></li>
                <li><Link href="#">Warranty</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Studio</h4>
              <ul>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Sustainability</Link></li>
                <li><Link href="#">Journal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Facebook">FB</a>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Neon Nepal. All rights reserved.
          </p>
        </div>
        
        <div className="footer-massive-brand">
          NEON NEPAL
        </div>
      </div>
    </footer>
  );
};

export default Footer;
