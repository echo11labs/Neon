"use client";
import { useState } from 'react';
import './Shop.css';
import { Filter } from 'lucide-react';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Business', 'Home', 'Events', 'Quotes', 'Art'];
  
  const products = [
    { id: 1, name: 'Good Vibes Only', price: 299, category: 'Quotes', image: '/images/neon_good_vibes.jpg' },
    { id: 2, name: 'Monstera Leaf', price: 189, category: 'Art', image: '/images/neon_leaf.jpg' },
    { id: 3, name: 'Spaceman', price: 349, category: 'Art', image: '/images/neon_astronaut.jpg' },
    // Reusing images for the sake of the mockup
    { id: 4, name: 'Cyberpunk Astronaut', price: 349, category: 'Business', image: '/images/neon_astronaut.jpg' },
    { id: 5, name: 'Neon Jungle', price: 189, category: 'Home', image: '/images/neon_leaf.jpg' },
    { id: 6, name: 'Weekend Vibes', price: 299, category: 'Events', image: '/images/neon_good_vibes.jpg' },
  ];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>The Collection</h1>
          <p className="shop-subtitle">Curated neon artistry for modern spaces.</p>
        </div>
        
        <div className="shop-layout">
          {/* Sidebar / Filters */}
          <aside className="shop-sidebar">
            <div className="filter-header">
              <h3>Filters</h3>
              <Filter size={16} />
            </div>
            
            <div className="filter-group">
              <h4>Categories</h4>
              <ul className="category-list">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          {/* Main Product Grid */}
          <main className="shop-main">
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="shop-card">
                  <div className="shop-card-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="shop-card-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
