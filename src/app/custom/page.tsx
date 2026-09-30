"use client";
import { useState } from 'react';
import './CustomDesign.css';
import NeonCanvas from '@/components/NeonCanvas';

// Using familiar Google Fonts loaded directly into 3D space
const fonts = [
  { name: 'Pacifico (Classic Neon)', url: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff' },
  { name: 'Dancing Script (Elegant)', url: 'https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zF4S-kcSWSVi_sl0nvb2_cw.woff2' },
  { name: 'Roboto (Modern Sans)', url: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2' },
  { name: 'Oswald (Bold Block)', url: 'https://fonts.gstatic.com/s/oswald/v49/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUtiZTaR.woff2' }
];

const colors = [
  { name: 'Warm White', hex: '#fcfcfc', glow: 'rgba(255, 255, 255, 0.6)' },
  { name: 'Ice Blue', hex: '#00e5ff', glow: 'rgba(0, 229, 255, 0.6)' },
  { name: 'Neon Pink', hex: '#ff007f', glow: 'rgba(255, 0, 127, 0.6)' },
  { name: 'Electric Green', hex: '#00ff73', glow: 'rgba(0, 255, 115, 0.6)' },
  { name: 'Deep Purple', hex: '#8a2be2', glow: 'rgba(138, 43, 226, 0.6)' },
  { name: 'Ruby Red', hex: '#ff1100', glow: 'rgba(255, 17, 0, 0.6)' },
  { name: 'Cyber Yellow', hex: '#ffd000', glow: 'rgba(255, 208, 0, 0.6)' },
];

const sizes = [
  { name: 'Small', label: 'Up to 2ft', basePrice: 150 },
  { name: 'Medium', label: 'Up to 3ft', basePrice: 250 },
  { name: 'Large', label: 'Up to 4ft', basePrice: 380 },
  { name: 'Oversized', label: 'Up to 6ft', basePrice: 550 },
];

const CustomDesign = () => {
  const [text, setText] = useState('Neon Nepal');
  const [fontUrl, setFontUrl] = useState(fonts[0].url);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState('Medium');
  
  const activeSize = sizes.find(s => s.name === size) || sizes[0];
  const letterCost = text.length * 8; // $8 per letter
  const price = activeSize.basePrice + letterCost;

  return (
    <div className="custom-design-page">
      <div className="container">
        <div className="builder-container">
          
          {/* 3D Preview Canvas */}
          <div className="preview-section">
            <div className="preview-canvas" style={{ padding: 0, cursor: 'grab' }}>
              <NeonCanvas text={text} fontUrl={fontUrl} colorHex={color.hex} />
            </div>
            
            <div className="preview-info">
              <div>
                <h3>Estimated Quote</h3>
                <span className="price-tag">${price}</span>
              </div>
              <p>Free worldwide shipping. Final price confirmed via email after design review. Drag the sign to view in 3D!</p>
            </div>
          </div>

          {/* Controls */}
          <div className="controls-section">
            <h1 className="controls-title">3D Design Studio</h1>
            <p className="controls-subtitle">Craft your custom neon piece in full 3D real-time.</p>
            
            <div className="control-group">
              <label>1. Your Text</label>
              <input 
                type="text" 
                className="text-input" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your design here..."
                maxLength={30}
              />
            </div>
            
            <div className="control-group">
              <label>2. Typography</label>
              <div className="font-dropdown-container">
                <select 
                  className="font-dropdown"
                  value={fontUrl}
                  onChange={(e) => setFontUrl(e.target.value)}
                >
                  {fonts.map(f => (
                    <option key={f.name} value={f.url}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="control-group">
              <label>3. Illumination Color <span className="color-label" style={{color: color.hex}}>{color.name}</span></label>
              <div className="color-selector">
                {colors.map(c => (
                  <button 
                    key={c.name}
                    className={`color-btn ${color.name === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex, boxShadow: color.name === c.name ? `0 0 15px ${c.glow}` : 'none' }}
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
            
            <div className="control-group">
              <label>4. Dimensions</label>
              <div className="size-selector">
                {sizes.map(s => (
                  <button 
                    key={s.name}
                    className={`size-btn ${size === s.name ? 'active' : ''}`}
                    onClick={() => setSize(s.name)}
                  >
                    <span className="size-name">{s.name}</span>
                    <span className="size-label">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button className="btn btn-primary w-full mt-4 quote-btn">
              Request Final Quote
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
