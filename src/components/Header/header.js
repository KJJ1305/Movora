import React from 'react'
import './header.css'

const header = () => {
  return (
    <div className="header" onClick={() => window.scroll(0, 0)}>MOVORA 🎥</div>
  )
}

export default header