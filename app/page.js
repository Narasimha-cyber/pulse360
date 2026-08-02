'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [allNews, setAllNews] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null); // MODAL KOSAM

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

  const categories = ['All', 'General', 'Politics', 'Sports', 'Technology', 'Business', 'Telangana'];

  let filteredNews = filter === 'All'
  ? allNews
    : allNews.filter(news => news.category === filter);

  if(search) {
    filteredNews = filteredNews.filter(news =>
      news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  // SHARE FUNCTION
  const handleShare = (news) => {
    if(navigator.share) {
      navigator.share({
        title: news.title,
        text: news.description,
        url: window.location.href
      }).catch(err => console.log(err))
    } else {
      navigator.clipboard.writeText(window.location.href + '?news=' + news.title);
      alert('Link Copied!')
    }
  }

  const bgColor = darkMode? '#111827' : '#f9fafb';
  const cardColor = darkMode? '#1f2937' : 'white';
  const textColor = darkMode? '#e5e7eb' : '#111827';

  return (
    <main style={{padding: "20px", fontFamily: "Arial", background: bgColor, minHeight: "100vh", color: textColor}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold"}}>Pulse360 🇮🇳</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{fontSize: "24px", background: "none", border: "none", cursor: "pointer"}}>
          {darkMode? '☀️' : '🌙'}
        </button>
      </div>

      <nav style={{marginBottom: "20px", display: "flex", gap: "15px", justifyContent: "center"}}>
        <a href="/" style={{color: "#2563eb", fontWeight: "bold"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
      </nav>

      {allNews.length > 0 && (
        <div style={{background: "#dc2626", color: "white", padding: "8px", borderRadius: "6px", marginBottom: "20px", overflow: "hidden", whiteSpace: "nowrap"}}>
          <marquee><b>BREAKING:</b> {allNews[0].title}</marquee>
        </div>
      )}

      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width: "100%", maxWidth: "500px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", margin: "0 auto 20px auto", display: "block", background: cardColor, color: textColor}}
      />

      <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap"}}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{padding: "8px 16px", borderRadius: "20px", border: "none", background: filter === cat? "#2563eb" : darkMode? "#374151" : "#e5e7eb", color: filter === cat? "white" : textColor, fontWeight: "bold", cursor: "pointer"}}>
            {cat}
          </button>
        ))}
      </div>

      {loading? <p style={{textAlign: "center", fontSize: "18px"}}>Loading news...</p> :
       filteredNews.length === 0? <p style={{textAlign: "center", color: "#888"}}>No news found</p> : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
          {filteredNews.map((news, i) => (
            <div key={i} style={{background: cardColor, padding: "15px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
              <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "uppercase"}}>
                {news.category}
              </span>
              {news.urlToImage && <img src={news.urlToImage} style={{width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginTop: "10px"}} />}
              <h3 style={{marginTop: "10px", fontSize: "16px"}}>{news.title}</h3>
              <p style={{fontSize: "14px", color: darkMode? "#9ca3af" : "#555"}}>{news.description}</p>
              <p style={{fontSize: "12px", color: "#888"}}>{news.source.name} • {new Date(news.publishedAt).toLocaleDateString('en-IN')}</p>

              <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <button onClick={() => setSelectedNews(news)} style={{flex: 1, background: "#2563eb", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold"}}>
                  Read More
                </button>
                <button onClick={() => handleShare(news)} style={{background: darkMode? "#374151" : "#e5e7eb", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer"}}>
                  📤 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NEWS MODAL - MANA SITE LO NE OPEN AVVALI */}
      {selectedNews && (
        <div onClick={() => setSelectedNews(null)} style={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px"}}>
          <div onClick={(e) => e.stopPropagation()} style={{background: cardColor, borderRadius: "12px", maxWidth: "700px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "20px"}}>
            <button onClick={() => setSelectedNews(null)} style={{float: "right", fontSize: "24px", background: "none", border: "none", cursor: "pointer"}}>✕</button>
            <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px"}}>{selectedNews.category}</span>
            {selectedNews.urlToImage && <img src={selectedNews.urlToImage} style={{width: "100%", borderRadius: "8px", marginTop: "15px"}} />}
            <h2 style={{marginTop: "15px"}}>{selectedNews.title}</h2>
            <p style={{fontSize: "14px", color: "#888"}}>{selectedNews.source.name} • {new Date(selectedNews.publishedAt).toLocaleString('en-IN')}</p>
            <p style={{marginTop: "15px", lineHeight: "1.6"}}>{selectedNews.description}</p>
            <p style={{marginTop: "10px", fontSize: "14px"}}><b>Source:</b> <a href={selectedNews.url} target="_blank" style={{color: "#2563eb"}}>Original Article</a></p>
            <button onClick={() => handleShare(selectedNews)} style={{marginTop: "15px", background: "#25D366", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold"}}>
              📤 Share This News
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
