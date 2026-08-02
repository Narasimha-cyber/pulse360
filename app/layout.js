export const metadata = {
  title: "Pulse360 - Real Time News",
  description: "Latest news from India",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
