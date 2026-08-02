export default async function Home() {
  const res = await fetch('https://pulse360-black.vercel.app/api/news', {cache: 'no-store'});
  const allNews = await res.json();

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: "#f9fafb", minHeight: "100vh"}}>
      <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold", textAlign: "center"}}>Pulse360 News</h1>
      <nav style={{marginBottom: "20px", display: "flex", gap: "15px", justifyContent: "center"}}>
        <a href="/" style={{color: "#2563eb", fontWeight: "bold"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
        <a href="/privacy" style={{color: "#2563eb"}}>Privacy</a>
      </nav>
      
      {allNews.length === 0 ? (
        <p style={{color: "red", textAlign: "center"}}>News load avvatledu. 2 mins wait cheyi</p>
      ) : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
          {allNews.map((news, i) => (
            <div key={i} style={{background: "white", padding: "15px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
              <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "uppercase"}}>
                {news.category}
              </span>
              {news.urlToImage && <img src={news.urlToImage} style={{width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginTop: "10px"}} />}
              <h3 style={{marginTop: "10px", fontSize: "16px"}}>{news.title}</h3>
              <p style={{fontSize: "14px", color: "#555"}}>{news.description}</p>
              <a href={news.url} target="_blank" style={{color: "#2563eb", fontSize: "14px"}}>Read More →</a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
