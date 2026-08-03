export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* LOGO */}
            <div className="w-[220px] h-10">
              <img
                src="/logo.png"
                alt="Pulse 360 NEWS"
                className="w-full h-full object-contain"
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
