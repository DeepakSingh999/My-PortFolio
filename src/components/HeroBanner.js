import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner" id="home">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">✨ New Season Collection</span>
          <h1 className="hero-title">
            Discover Premium
            <span className="highlight"> Products</span>
          </h1>
          <p className="hero-description">
            Shop the latest trends with up to 50% off. Premium quality, 
            unbeatable prices, and free shipping on orders over $100.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <a href="#deals" className="btn btn-secondary">
              View Deals
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-cards">
            <div className="floating-card card-1">
              <span className="card-discount">-30%</span>
              <span className="card-emoji">👟</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-discount">-50%</span>
              <span className="card-emoji">📱</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-discount">-20%</span>
              <span className="card-emoji">👜</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
