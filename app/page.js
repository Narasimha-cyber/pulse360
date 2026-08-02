export default function Home() {
  const news = [
    { id: 1, title: "India Wins T20 World Cup 2026", category: "Sports", time: "2 hours ago" },
    { id: 2, title: "New AI Model Launched by Google", category: "Technology", time: "5 hours ago" },
    { id: 3, title: "Sensex Hits All Time High", category: "Business", time: "1 hour ago" },
  ]

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: "#f9fafb"}}>
      <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold"}}>Pulse360 News</h1>
      <p style={{color: "#555"}}>Real-time News from India</p>
      
      {news.map((item) => (
        <div key={item.id} style={{border: "1px solid #ddd", padding: "15px", marginTop: "15px", borderRadius: "8px", background: "white"}}>
          <span style={{background: "#2563eb", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px"}}>{item.category}</span>
          <h2 style={{marginTop: "10px", fontSize: "20px"}}>{item.title}</h2>
          <p style={{color: "gray", fontSize: "14px"}}>{item.time}</p>
        </div>
      ))}
    </main>
  )
}
