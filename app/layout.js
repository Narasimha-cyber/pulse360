export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            
           {/* LOGO - INLINE STYLE */}
         <div style={{ width: '300px', height: '48px' }}>
          <img
            src="/logo.png"
            alt="Pulse 360 NEWS"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
           />
         </div>

            {/* RIGHT SIDE - SEARCH / MENU */}
            <nav>
              {/* nee menu code ikkada */}
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER - unte ikkada */}
      </body>
    </html>
  )
}
