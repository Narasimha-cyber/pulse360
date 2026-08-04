'use client';
import { useState, useEffect, Fragment } from 'react';

export default function HomePage() {
  const [filter, setFilter] = useState('top');
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [breakingNews, setBreakingNews] = useState('');
  const staticArticles = [
  { id: 'static-1', title: "CM Chandrababu New Scheme Launch", category: "Politics", type: "static" },
  { id: 'static-2', title: "AP Inter Results 2026 Out", category: "Education", type: "static" },
  
];
  useEffect(() => {
    if(darkMode){
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    setAllNews([]);
    let apiUrl = '/api/news';
    if(filter === 'andhra') apiUrl = '/api/news?type=andhra';
    if(filter === 'sports') apiUrl = '/api/news?type=sports';

    fetch(apiUrl)
     .then(res => res.json())
     .then(data => {
        // Date convert cheyyadam - IST ki
        const formattedNews = (data.articles || []).map(article => ({
         ...article,
          publishedAt: new Date(article.publishedAt).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})
        }));

        setAllNews(formattedNews);
        const headlines = (formattedNews || []).slice(0,3).map(a => a.title).join(' *** ');
        setBreakingNews(headlines);
        setLoading(false);
      })
     .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [filter]);

  const shareWhatsApp = (title, url) => {
    const text = `*Pulse360 News*\n\n${title}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  const addComment = (id) => {
    if(!commentText.trim()) return;
    const newComments = {...comments};
    if(!newComments[id]) newComments[id] = [];
    newComments[id].push({text: commentText, time: new Date().toLocaleString('en-IN')});
    setComments(newComments);
    setCommentText('');
    localStorage.setItem('newsComments', JSON.stringify(newComments));
  }

  useEffect(()=>{
    const saved = localStorage.getItem('newsComments');
    if(saved) setComments(JSON.parse(saved));
  },[])

  const AdsBanner = () => (
    <div style={{gridColumn:'1/-1', margin:'24px 0', padding:'24px', background: darkMode? '#111' : '#f3f3f3', border:'2px dashed #444', borderRadius:'12px', textAlign:'center'}}>
      <p style={{fontSize:'12px', color:'#888', marginBottom:'8px'}}>Advertisement</p>
      <div style={{width:'100%', height:'90px', background: darkMode? '#222' : '#ddd', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <span style={{fontWeight:'bold', color: darkMode? '#aaa' : '#555'}}>728x90 Banner Ad Space</span>
      </div>
    </div>
  );

  return (
    <div style={{background: darkMode? '#000' : '#fff', color: darkMode? '#fff' : '#000', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <header style={{position:'sticky', top:0, background: darkMode? '#000' : '#fff', padding:'16px 20px', borderBottom:`1px solid ${darkMode? '#222' : '#ddd'}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
        <h1 style={{fontSize:'28px', fontWeight:'bold', color:'#ef4444', margin:0}}>Pulse360</h1>
        <div style={{display:'flex', gap:'12px', alignItems:'center', marginTop:'10px'}}>
          <button onClick={()=>{setFilter('top'); setSelectedNews(null)}} style={{padding:'8px 16px', background: filter==='top'? '#ef4444' : (darkMode? '#222' : '#eee'), color: darkMode? '#fff' : '#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>Home</button>
          <button onClick={()=>{setFilter('andhra'); setSelectedNews(null)}} style={{padding:'8px 16px', background: filter==='andhra'? '#ef4444' : (darkMode? '#222' : '#eee'), color: darkMode? '#fff' : '#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>AP News</button>
          <button onClick={()=>{setFilter('sports'); setSelectedNews(null)}} style={{padding:'8px 16px', background: filter==='sports'? '#ef4444' : (darkMode? '#222' : '#eee'), color: darkMode? '#fff' : '#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>Sports</button>
          <button onClick={()=>setDarkMode(!darkMode)} style={{padding:'8px', borderRadius:'50%', background: darkMode? '#333' : '#eee', border:'none', cursor:'pointer', fontSize:'20px'}} >
            {darkMode? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* BREAKING NEWS TICKER */}
      <div style={{width:'100%', overflow:'hidden', background:'#ef4444', color:'#fff', padding:'8px 0', fontWeight:'bold'}}>
        <div style={{display:'inline-block', whiteSpace:'nowrap', paddingLeft:'100%', animation:'scroll-left 20s linear infinite'}}>
          {breakingNews || '🔥 Loading Breaking News...'}
        </div>
      </div>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

     {/* NEWS GRID - Static + API News */}
<div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
  {[...staticArticles, ...allNews].map((news) => (
    <a 
      key={news.id}
     href={`/news/${news.id}`}
          style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textDecoration: 'none', color: darkMode ? '#fff' : '#000', background: darkMode ? '#111' : '#fff', cursor: 'pointer'}}
    >
      <span style={{fontSize: '12px', background: '#0070f3', color: 'white', padding: '3px 8px', borderRadius: '4px'}}>
        {news.category}
      </span>
      <h3 style={{marginTop: '10px', fontSize: '18px'}}>{news.title}</h3>
      <p style={{fontSize: '14px', color: '#888'}}>Read more →</p>
    </a>
  ))}
</div>
        {selectedNews? (
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
            <button onClick={()=>setSelectedNews(null)} style={{marginBottom:'16px', padding:'8px 16px', background: darkMode? '#222' : '#eee', color: darkMode? '#fff' : '#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>← Back</button>
            <img src={selectedNews.image || 'https://via.placeholder.com/800x400'} style={{width:'100%', borderRadius:'12px'}}/>
            <h2 style={{fontSize:'32px', fontWeight:'bold', marginTop:'20px', lineHeight:'1.3'}}>{selectedNews.title}</h2>
            <p style={{color:'#9ca3af', fontSize:'14px', marginTop:'10px'}}>Published: {selectedNews.publishedAt}</p>
            <p style={{marginTop:'20px', fontSize:'18px', lineHeight:'1.8'}}>{selectedNews.description}</p>
            <p style={{marginTop:'10px', color:'#d1d5db', lineHeight:'1.7'}}>{selectedNews.content}</p>
            <div style={{marginTop:'24px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <button onClick={()=>shareWhatsApp(selectedNews.title, selectedNews.url)} style={{padding:'10px 20px', background:'#25D366', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer'}}>Share on WhatsApp</button>
              <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" style={{padding:'10px 20px', background: darkMode? '#222' : '#eee', color: darkMode? '#fff' : '#000', borderRadius:'8px', textDecoration:'none'}}>Read Full Article</a>
            </div>
            <div style={{marginTop:'40px', borderTop:`1px solid ${darkMode? '#222' : '#ddd'}`, paddingTop:'20px'}}>
              <h3 style={{fontSize:'22px', fontWeight:'bold', marginBottom:'16px'}}>Comments</h3>
              <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                <input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Write your comment..." style={{flex:1, padding:'12px', background: darkMode? '#111' : '#f3f3f3', border:`1px solid ${darkMode? '#333' : '#ccc'}`, borderRadius:'8px', color: darkMode? '#fff' : '#000'}} />
                <button onClick={()=>addComment(selectedNews.url)} style={{padding:'12px 20px', background:'#ef4444', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer'}}>Post</button>
              </div>
              {(comments[selectedNews.url] || []).length === 0? <p style={{color:'#6b7280'}}>Be the first to comment</p> : (comments[selectedNews.url] || []).map((c,i)=>(
                <div key={i} style={{background: darkMode? '#111' : '#f3f3f3', padding:'14px', borderRadius:'8px', marginBottom:'10px'}}>
                  <p style={{margin:0}}>{c.text}</p>
                  <p style={{fontSize:'12px', color:'#6b7280', margin:'5px 0 0'}}>{c.time}</p>
                </div>
              )) }
            </div>
          </div>
        ) : (
          <div>
            {loading? <p style={{textAlign:'center', fontSize:'18px', marginTop:'50px'}}>Loading...</p>:
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px'}}>
              {allNews.length === 0? <p style={{textAlign:'center', gridColumn:'1/-1'}}>No news found</p>:
              allNews.map((article, i) => (
                <Fragment key={i}>
                  <div style={{background: darkMode? '#111' : '#f9f9f9', borderRadius:'12px', overflow:'hidden', border:`1px solid ${darkMode? '#222' : '#ddd'}`}} >
                    <div onClick={()=>setSelectedNews(article)} style={{cursor:'pointer'}}>
                      <div style={{width:'100%', height:'200px', overflow:'hidden'}}>
                        <img src={article.image || 'https://via.placeholder.com/400x200'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                      </div>
                      <div style={{padding:'16px', display:'flex', flexDirection:'column', gap:'8px'}}>
                        <p style={{fontSize:'12px', color:'#9ca3af', margin:0}}>{article.source?.name}</p>
                        <h3 style={{fontSize:'16px', fontWeight:'bold', margin:0, lineHeight:'1.4'}}>{article.title}</h3>
                        <p style={{fontSize:'14px', color:'#d1d5db', margin:0}}>Published: {article.publishedAt}</p>
                        <p style={{fontSize:'14px', color:'#d1d5db', margin:0}}>{article.description?.slice(0,100)}...</p>
                      </div>
                    </div>
                    {/* WhatsApp Share Button - Card lo ne undi */}
                    <div style={{padding:'0 16px 16px'}}>
                      <button onClick={()=>shareWhatsApp(article.title, article.url)} style={{width:'100%', padding:'10px', background:'#25D366', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Share on WhatsApp</button>
                    </div>
                  </div>
                  {(i + 1) % 4 === 0 && <AdsBanner />}
                </Fragment>
              )) }
            </div> }
          </div>
        )}
      </div>
      <footer style={{background: darkMode? '#020202' : '#f3f3f3', borderTop:`1px solid ${darkMode? '#222' : '#ddd'}`, marginTop:'40px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center', padding:'20px'}}>
          <p style={{color:'#9ca3af', fontSize:'14px', margin:0}}>© 2026 Pulse360. All rights reserved.</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'8px 0 0'}}>Made with ❤️ in INDIA - ANDHRA PRADESH - NARASIMHA RAO KILLI ❤️ </p>
        </div>
      </footer>
    </div>
  )
}
