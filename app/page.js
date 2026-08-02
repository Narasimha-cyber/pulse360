'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [allNews, setAllNews] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Page load ayinappude okesari motham news techkunta
  useEffect(() => {
    setLoading(true);
    fetch('/api/news', {cache: 'no-store'})
      .then(res => res.json())
      .then(data => {
        setAllNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false))
  }, []);

  const categories = ['All', 'General', 'Politics', 'Sports', 'Technology', 'Business'];
  
  const filteredNews = filter === 'All' 
    ? allNews 
    : allNews.filter(news => news.category === filter);

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: "#f9fafb", minHeight: "100vh"}}>
      <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold", textAlign: "center"}}>Pulse360 🇮🇳</h1>
      
      <nav style={{marginBottom: "20px", display: "flex", gap: "15px", justifyContent: "center"}}>
        <a href="/" style={{color: "#2563eb", fontWeight: "bold"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
      </nav>

      {/* CATEGORY FILTER BUTTONS */}
      <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap"}}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 16px", 
              borderRadius: "20px", 
              border: "none",
              background: filter === cat ? "#2563eb" : "#e5e7eb",
              color: filter === cat ? "white" : "black",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {loading ? (
        <p style={{textAlign: "center", fontSize: "18px"}}>Loading news...</p>
      ) : filteredNews.length === 0 ? (
        <p style={{textAlign: "center", color: "#888"}}>No news found in "{filter}" category</p>
      ) : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
          {filteredNews.map((news, i) => (
            <div key={i} style={{background: "white", padding: "15px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
              <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "uppercase"}}>
                {news.category}
              </span>
              {news.urlToImage && <img src={news.urlToImage} style={{width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginTop: "10px"}} />}
              <h3 style={{marginTop: "10px", fontSize: "16px"}}>{news.title}</h3>
              <p style={{fontSize: "14px", color: "#555"}}>{news.description}</p>
              <p style={{fontSize: "12px", color: "#888"}}>{news.source.name}</p>
              <a href={news.url} target="_blank" style={{color: "#2563eb", fontSize: "14px", fontWeight: "bold"}}>Read More →</a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
