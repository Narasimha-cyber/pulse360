export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
      <header style={{ background: 'white', padding: '16px 24px', borderBottom: '1px solid #eee' }}>
  
  {/* IMG TAG KI BADULU DIV WITH BACKGROUND */}
  <div style={{
    width: '400px',
    height: '80px',
    backgroundImage: 'url(/logo.png)',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center'
  }}></div>

</header>
        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER - unte ikkada */}
      </body>
    </html>
  )
}
