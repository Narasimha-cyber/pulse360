export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
       <header style={{ 
  background: 'white', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
  position: 'sticky', 
  top: 0, 
  zIndex: 50,
  width: '100%'
}}>
  <div style={{ 
    padding: '16px 24px', 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'flex-start'
  }}>
    
    {/* LOGO - FORCE WITH IMPORTANT */}
    <img
      src="/logo.png"
      alt="Pulse 360 NEWS"
      style={{ 
        width: '400px', 
        height: '80px', 
        objectFit: 'contain', 
        display: 'block'
      }}
    />

  </div>
</header>
        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER - unte ikkada */}
      </body>
    </html>
  )
}
