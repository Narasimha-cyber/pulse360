export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
       <header style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
    
    {/* LOGO - FORCE 400PX NO MATTER WHAT */}
    <div style={{ width: '400px !important', height: '80px !important', minWidth: '400px', flexShrink: 0 }}>
      <img
        src="/logo.png"
        alt="Pulse 360 NEWS"
        style={{ width: '400px !important', height: '80px !important', objectFit: 'contain', display: 'block' }}
      />
    </div>

  </div>
</header>
        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER - unte ikkada */}
      </body>
    </html>
  )
}
