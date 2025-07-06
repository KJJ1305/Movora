import React from 'react'
import './header.css'

const header = () => {
  return (
    <div className="header">
      <a className="myname" target="_blank" href="https://www.linkedin.com/in/jesvin-jaison-735369320">Jesvin Jaison</a>
      <div className="header-text" onClick={() => window.scroll(0, 0)}>MOVORA 🎥</div>
      <a className="gitlink" href="https://github.com/KJJ1305/Movora"><img src="images/git3.png" alt="git" /></a>  
    </div>
  )
}

export default header