export default async function Home() {
  const res = await fetch('https://pulse360-news.vercel.app/api/news', {cache: 'no-store'});
  const allNews = await res.json();

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: "#f9fafb"}}>
      <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold"}}>Pulse360 News</h1>
      
      <nav style={{marginBottom: "20px", display: "flex", gap: "15px"}}>
        <a href="/" style={{color: "#2563eb"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
        <a href="/privacy" style={{color: "#2563eb"}}>Privacy</a>
      </nav>
      
      <p style={{color: "#555", marginBottom: "20px"}}>Real-time News from India</p>
      
      <div style={{display: "grid", gap: "15px"}}>
        {allNews.map((news, i) => (
          <div key={i} style={{background: "white", padding: "15px", borderRadius: "8px", border: "1px solid #eee"}}>
            <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "capitalize"}}>
              {news.category}
            </span>
            <h3 style={{marginTop: "10px", fontSize: "18px"}}>{news.title}</h3>
            <p style={{color: "#777", fontSize: "14px"}}>{news.source?.name}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
