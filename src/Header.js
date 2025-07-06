import React from 'react';

function Header() {
  return (
    
    <header>
      <div className="header">
        <span onClick={() => window.scroll(0, 0)} className="header">MOVORA</span>
      </div>
    </header>
  );
}

export default Header; 