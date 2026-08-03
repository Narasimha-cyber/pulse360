"use client"
import { useState, useEffect } from 'react'
import Script from 'next/script' // Idhi add cheyi

export default function Home() {
  const [allNews, setAllNews] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
 
  function GlobeIntro({onFinish}) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
      onFinish()
    }, 4000)
  }, [])
  if(!show) return null
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div id="globeViz" style={{width: '100%', height: '80%'}}></div>
      <h1 style={{color: 'white', fontSize: '40px', fontWeight: 'bold'}}>Pulse 360 NEWS</h1>
      <p style={{color: '#d32f2f', fontSize: '18px'}}>From Space to Y</p>
    </div>
  )
}
  useEffect(() => {
    setLoading(true);
    fetch('/api/news', {cache: 'no-store'})
  .then(res => res.json())
  .then(data => {
        setAllNews(data);
        setLoading(false);
      })
  .catch(() => setLoading(false))

    const saved = localStorage.getItem('pulse360_fav');
    if(saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pulse360_fav', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
  if(!loading) {
    const timer = setTimeout(() => {
      if(window.Globe) {
        const globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2 }, 3000)
          (document.getElementById('globeViz'))
      }
    }, 100)
    return () => clearTimeout(timer)
  }
}, [loading]);
  const categories = ['All', 'General', 'Politics', 'Sports', 'Technology', 'Business', 'Telangana', 'Favorites'];

  let filteredNews = filter === 'All'
? allNews
    : filter === 'Favorites'
  ? allNews.filter(news => favorites.includes(news.url))
    : allNews.filter(news => news.category === filter);

  if(search) {
    filteredNews = filteredNews.filter(news =>
      news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  const toggleFavorite = (url) => {
    if(favorites.includes(url)) {
      setFavorites(favorites.filter(f => f!== url));
    } else {
      setFavorites([...favorites, url]);
    }
  }

  const handleComment = () => {
    if(!comment.trim() ||!selectedNews) return;
    const newsComments = comments[selectedNews.url] || [];
    setComments({...comments, [selectedNews.url]: [...newsComments, comment]});
    setComment('');
  }

  const handleShare = (news) => {
    if(navigator.share) {
      navigator.share({title: news.title, text: news.description, url: window.location.href})
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link Copied!')
    }
  }

  const bgColor = darkMode? '#111827' : '#f9fafb';
  const cardColor = darkMode? '#1f2937' : 'white';
  const textColor = darkMode? '#e5e7eb' : '#111827';
  const adBg = darkMode? "#374151" : "#e5e7eb";
 
useEffect(() => {
  if(!loading && window.Globe) {
    const globe = Globe()
     .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
     .pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2 }, 3000)
      (document.getElementById('globeViz'))
  }
}, [loading])

  return (
  <>
    {loading && <GlobeIntro onFinish={() => setLoading(false)} />}
    <Script src="https://unpkg.com/three@0.160.0/build/three.min.js" strategy="beforeInteractive" />
    <Script src="https://unpkg.com/globe.gl" strategy="beforeInteractive" />
    {!loading && (
    <main style={{padding: "20px", fontFamily: "Arial", background: bgColor, minHeight: "100vh", color: textColor}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold"}}>Pulse360 🇮🇳</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{fontSize: "24px", background: "none", border: "none", cursor: "pointer"}}>{darkMode? '☀️' : '🌙'}</button>
      </div>

      <nav style={{marginBottom: "20px", display: "flex", gap: "15px", justifyContent: "center"}}>
        <a href="/" style={{color: "#2563eb", fontWeight: "bold"}}>Home</a>
        <a href="/about" style={{color: "#2563eb"}}>About</a>
        <a href="/contact" style={{color: "#2563eb"}}>Contact</a>
      </nav>

      {/* TOP BANNER AD */}
      <div style={{width: "100%", height: "90px", background: adBg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", border: "2px dashed #9ca3af"}}>
        <p style={{color: "#888", fontSize: "14px"}}>728x90 Banner Ad Space</p>
      </div>

      {/* TRENDING SECTION */}
      {allNews.length > 0 && (
        <div style={{marginBottom: "30px"}}>
          <h2 style={{fontSize: "20px", marginBottom: "10px"}}>🔥 Trending Now</h2>
          <div style={{display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px"}}>
            {allNews.slice(0,5).map((news, i) => (
              <div key={i} onClick={() => setSelectedNews(news)} style={{minWidth: "250px", background: cardColor, padding: "10px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
                <p style={{fontSize: "14px", fontWeight: "bold"}}>{news.title.slice(0, 60)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURED 3 NEWS CARDS WITH YOUR UPLOADED IMAGES */}
<div style={{marginBottom: "40px", marginTop: "20px"}}>
  <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#d32f2f"}}>🔥 Featured News</h2>
  
  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
    
    <div style={{border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0.1)", background: cardColor}}>
      <img src="/news1.jpg" alt="AP Rains" style={{width: "100%", height: "200px", objectFit: "cover"}} />
      <div style={{padding: "16px"}}>
        <p style={{fontSize: "12px", color: "#888"}}>2 hours ago</p>
        <h3 style={{fontSize: "18px", fontWeight: "600", color: textColor}}>AP lo Heavy Rains: 3 districts alert</h3>
      </div>
    </div>

    <div style={{border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: cardColor}}>
      <img src="/news2.jpg" alt="CM Interview" style={{width: "100%", height: "200px", objectFit: "cover"}} />
      <div style={{padding: "16px"}}>
        <p style={{fontSize: "12px", color: "#888"}}>5 hours ago</p>
        <h3 style={{fontSize: "18px", fontWeight: "600", color: textColor}}>Pulse 360 Exclusive: CM tho Interview</h3>
      </div>
    </div>

    <div style={{border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: cardColor}}>
      <img src="/news3.jpg" alt="IPL Final" style={{width: "100%", height: "200px", objectFit: "cover"}} />
      <div style={{padding: "16px"}}>
        <p style={{fontSize: "12px", color: "#888"}}>Yesterday</p>
        <h3 style={{fontSize: "18px", fontWeight: "600", color: textColor}}>IPL Final: RCB vs GT Highlights</h3>
      </div>
    </div>

  </div>
</div>
      {allNews.length > 0 && (
        <div style={{background: "#dc2626", color: "white", padding: "8px", borderRadius: "6px", marginBottom: "20px"}}><marquee><b>BREAKING:</b> {allNews[0].title}</marquee></div>
      )}

      <input type="text" placeholder="Search news..." value={search} onChange={(e) => setSearch(e.target.value)} style={{width: "100%", maxWidth: "500px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", margin: "0 auto 20px auto", display: "block", background: cardColor, color: textColor}} />

      <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap"}}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{padding: "8px 16px", borderRadius: "20px", border: "none", background: filter === cat? "#2563eb" : adBg, color: filter === cat? "white" : textColor, fontWeight: "bold", cursor: "pointer"}}>
            {cat} {cat === 'Favorites' && `(${favorites.length})`}
          </button>
        ))}
      </div>

      {loading? <p style={{textAlign: "center", fontSize: "18px"}}>Loading news...</p> :
       filteredNews.length === 0? <p style={{textAlign: "center", color: "#888"}}>No news found</p> : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
          {filteredNews.map((news, i) => (
            <div key={i}>
              {/* IN-FEED AD EVERY 4 CARDS */}
              {i > 0 && i % 4 === 0 && (
                <div style={{gridColumn: "1 / -1", width: "100%", height: "250px", background: adBg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0", border: "2px dashed #9ca3af"}}>
                  <p style={{color: "#888", fontSize: "14px"}}>300x250 In-Feed Ad Space</p>
                </div>
              )}

              {/* NEWS CARD */}
              <div style={{background: cardColor, padding: "15px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
                <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "uppercase"}}>{news.category}</span>
                {news.urlToImage && <img src={news.urlToImage} style={{width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginTop: "10px"}} />}
                <h3 style={{marginTop: "10px", fontSize: "16px"}}>{news.title}</h3>
                <p style={{fontSize: "14px", color: darkMode? "#9ca3af" : "#555"}}>{news.description}</p>
                <p style={{fontSize: "12px", color: "#888"}}>{news.source.name} • {new Date(news.publishedAt).toLocaleDateString('en-IN')}</p>

                <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                  <button onClick={() => setSelectedNews(news)} style={{flex: 1, background: "#2563eb", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold"}}>Read More</button>
                  <button onClick={() => toggleFavorite(news.url)} style={{background: favorites.includes(news.url)? "red" : adBg, border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "16px"}}>
                    {favorites.includes(news.url)? '❤️' : '🤍'}
                  </button>
                  <button onClick={() => handleShare(news)} style={{background: adBg, border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer"}}>📤</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NEWS MODAL WITH COMMENTS */}
      {selectedNews && (
        <div onClick={() => setSelectedNews(null)} style={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px"}}>
          <div onClick={(e) => e.stopPropagation()} style={{background: cardColor, borderRadius: "12px", maxWidth: "700px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "20px"}}>
            <button onClick={() => setSelectedNews(null)} style={{float: "right", fontSize: "24px", background: "none", border: "none", cursor: "pointer"}}>✕</button>
            <span style={{background: "#2563eb", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "12px"}}>{selectedNews.category}</span>
            {selectedNews.urlToImage && <img src={selectedNews.urlToImage} style={{width: "100%", borderRadius: "8px", marginTop: "15px"}} />}
            <h2 style={{marginTop: "15px"}}>{selectedNews.title}</h2>
            <p style={{fontSize: "14px", color: "#888"}}>{selectedNews.source.name} • {new Date(selectedNews.publishedAt).toLocaleString('en-IN')}</p>
            <p style={{marginTop: "15px", lineHeight: "1.6"}}>{selectedNews.description}</p>
            <button onClick={() => handleShare(selectedNews)} style={{marginTop: "15px", background: "#25D366", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold"}}>📤 Share</button>

            <div style={{marginTop: "30px", borderTop: "1px solid #ccc", paddingTop: "20px"}}>
              <h3>Comments 💬</h3>
              <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." style={{flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", background: cardColor, color: textColor}}/>
                <button onClick={handleComment} style={{background: "#2563eb", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer"}}>Post</button>
              </div>
              <div style={{marginTop: "15px"}}>
                {(comments[selectedNews.url] || []).map((c, i) => <p key={i} style={{background: adBg, padding: "8px", borderRadius: "6px", marginTop: "8px"}}>{c}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{marginTop: "50px", padding: "30px 20px", background: adBg, textAlign: "center", borderRadius: "12px 12px 0 0"}}>
        <p style={{fontSize: "14px", marginBottom: "10px"}}><b>Pulse360 🇮🇳</b> - Your 24/7 News Source</p>
        <p style={{fontSize: "12px", color: "#888"}}>© 2026 Pulse360. All rights reserved. Made in ANDHRA PRADESH ❤️ NARASIMHA RAO KILLI </p>
      </footer>
        )}
    </main>
      </>
  )
}
