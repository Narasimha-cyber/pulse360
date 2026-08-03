"use client"
import { useState, useEffect } from 'react'
import LiveVisitors from '../components/LiveVisitors'
import IntroModal from '../components/IntroModal'

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [filter, setFilter] = useState('all');

  const bgColor = darkMode ? '#111' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';
  const cardBg = darkMode ? '#222' : '#f9f9f9';
  const adBg = darkMode ? '#222' : '#f0f0f0';

  useEffect(() => {
  let apiUrl = '/api/news';
  if(filter === 'andhra') apiUrl = '/api/news?type=andhra';
  if(filter === 'sports') apiUrl = '/api/news?type=sports';
  if(filter === 'national') apiUrl = '/api/news?type=national';

  fetch(apiUrl)
   .then(res => res.json())
   .then(data => setAllNews(data.articles || []))
   .catch(err => console.log(err))
}, [filter]); // 👈 filter change ayyina malli call avvali

  const filteredNews = filter === 'all' 
    ? allNews 
    : allNews.filter(news => news.category === filter);

  const topNews = allNews.slice(0, 10);
  const breakingNews = allNews.slice(0, 5);

  return (
    <>
      <IntroModal />
      
      <main style={{padding: "20px", fontFamily: "Arial", background: bgColor, minHeight: "100vh", color: textColor, transition: "all 0.3s"}}>
        
        {/* Header */}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
          <div>
            <h1 style={{color: "#2563eb", fontSize: "32px", fontWeight: "bold", margin: 0}}>Pulse360 India</h1>
            <div style={{marginTop: "5px"}}><LiveVisitors /></div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{fontSize: "16px", padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{marginBottom: "20px", display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap"}}>
          <a href="#" onClick={() => setFilter('all')} style={{color: "#2563eb", fontWeight: "bold", textDecoration: "none"}}>Home</a>
          <a href="#" onClick={() => setFilter('andhra')} style={{color: "#2563eb", textDecoration: "none"}}>AP News</a>
          <a href="#" onClick={() => setFilter('sports')} style={{color: "#2563eb", textDecoration: "none"}}>Sports</a>
          <a href="#" onClick={() => setFilter('national')} style={{color: "#2563eb", textDecoration: "none"}}>National</a>
        </nav>

        {/* Ad Banner */}
        <div style={{width: "100%", height: "90px", background: adBg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", fontWeight: "bold"}}>
          Your Ad Here
        </div>

        {/* Breaking News */}
        {breakingNews.length > 0 && (
          <div style={{marginBottom: "30px"}}>
            <h2 style={{color: "red", fontSize: "24px"}}>🔥 Breaking News</h2>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px"}}>
              {breakingNews.map((news, i) => (
                <div key={i} style={{border: "1px solid #ccc", borderRadius: "8px", padding: "10px", background: cardBg}}>
                  {news.image && <img src={news.image} alt="" style={{width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px"}}/>}
                  <h3 style={{fontSize: "16px", marginTop: "10px"}}>{news.title}</h3>
                  <p style={{fontSize: "12px", color: "gray"}}>{news.source?.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top 10 */}
        {topNews.length > 0 && (
          <div style={{marginBottom: "30px"}}>
            <h2 style={{color: "#2563eb", fontSize: "24px"}}>📰 Top 10 News</h2>
            {topNews.map((news, i) => (
              <div key={i} style={{display: "flex", gap: "15px", marginBottom: "15px", padding: "10px", borderBottom: "1px solid #ddd", background: cardBg, borderRadius: "8px"}}>
                {news.image && <img src={news.image} alt="" style={{width: "120px", height: "80px", objectFit: "cover", borderRadius: "5px"}}/>}
                <div>
                  <h3 style={{margin: 0, fontSize: "16px"}}>{news.title}</h3>
                  <p style={{fontSize: "12px", color: "gray", margin: "5px 0 0 0"}}>{news.source?.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {allNews.length === 0 && <p style={{textAlign: "center"}}>Loading news...</p>}

        {/* Footer */}
        <footer style={{marginTop: "40px", padding: "20px", textAlign: "center", borderTop: "2px solid #2563eb", background: cardBg, borderRadius: "8px"}}>
          <h3 style={{color: "#2563eb", margin: "0 0 10px 0"}}>Pulse360 India</h3>
          <p style={{margin: "5px 0", fontSize: "14px"}}>From Space to Andhra Pradesh</p>
          <p style={{margin: "5px 0", fontSize: "14px"}}>© 2026 Andhra Pradesh. All Rights Reserved.</p>
          <p style={{margin: "5px 0", fontSize: "14px", fontWeight: "bold"}}>Developed by: Narasimha Rao Killi</p>
          <div style={{marginTop: "10px", fontSize: "12px", color: "gray"}}>
            <a href="#" style={{color: "#2563eb", margin: "0 10px"}}>About</a>
            <a href="#" style={{color: "#2563eb", margin: "0 10px"}}>Contact</a>
            <a href="#" style={{color: "#2563eb", margin: "0 10px"}}>Privacy</a>
          </div>
        </footer>

      </main>
    </>
  )
}
