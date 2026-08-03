export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
       <header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    
    {/* LOGO - LEFT SIDE */}
    <div style={{ width: '400px', height: '80px', flexShrink: 0 }}>
      <img
        src="/logo.png"
        alt="Pulse 360 NEWS"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    {/* RIGHT SIDE - EMPTY FOR NOW */}
    <div></div>

  </div>
</header>
        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER - unte ikkada */}
      </body>
    </html>
  )
}
