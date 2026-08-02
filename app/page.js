export default async function Home() {
  let allNews = [];
  try {
    const res = await fetch('/api/news', {cache: 'no-store'});
    allNews = await res.json();
  } catch(e) {
    allNews = [];
  }

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: "#f9fafb"}}>
      <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold"}}>Pulse360 News</h1>
      
      <nav style={{marginBottom: "20px", display: "flex", gap: "15px"}}>
        <a href="/" style={{color: "#2563eb"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
        <a href="/privacy" style={{color: "#2563eb"}}>Privacy</a>
      </nav>
      
      {allNews.length === 0 ? (
        <p style={{color: "red"}}>News load avvatledu. API limit ayyundochu. 1 hour tarvatha try cheyi</p>
      ) : (
        <div style={{display: "grid", gap: "15px"}}>
          {allNews.map((news, i) => (
            <div key={i} style={{background: "white", padding: "15px", borderRadius: "8px", border: "1px solid #eee"}}>
              <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px"}}>
                {news.category}
              </span>
              <h3 style={{marginTop: "10px"}}>{news.title}</h3>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
