"use client"
import { useState, useEffect } from 'react'

export default function IntroModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // prathi refresh ki chupinchali ante ee line use chey
    setShow(true); 
    
    // 1st time matrame chupinchali ante ee 3 lines use chey
    // const seen = sessionStorage.getItem('pulse360_intro_seen');
    // if(!seen) setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('pulse360_intro_seen', 'true');
  }

  if(!show) return null;

  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center', color: 'white'}}>
        <h1 style={{fontSize: '50px', color: '#00aaff', textShadow: '0 0 20px #00aaff'}}>🌍 Pulse 360 NEWS</h1>
        <p style={{color: '#ffdd00', fontSize: '18px'}}>From Space to Andhra Pradesh</p>
        <button onClick={handleClose} style={{marginTop: '20px', padding: '12px 30px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'}}>
          Enter Site
        </button>
      </div>
    </div>
  )
}
