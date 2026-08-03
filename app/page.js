'use client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [filter, setFilter] = useState('top');
  const [allNews, setAllNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setAllNews([]);
    let apiUrl = '/api/news';
    if(filter === 'andhra') apiUrl = '/api/news?type=andhra';
    if(filter === 'sports') apiUrl = '/api/news?type=sports';

    fetch(apiUrl)
  .then(res => res.json())
  .then(data => setAllNews(data.articles || []))
  .catch(err => console.log(err))
  }, [filter]);

  const shareWhatsApp = (title, url) => {
    const text = `*${title}*\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  const addComment = (id) => {
    if(!commentText.trim()) return;
    const newComments = {...comments};
    if(!newComments[id]) newComments[id] = [];
    newComments[id].push(commentText);
    setComments(newComments);
    setCommentText('');
    localStorage.setItem('newsComments', JSON.stringify(newComments));
  }

  useEffect(()=>{
    const saved = localStorage.getItem('newsComments');
    if(saved) setComments(JSON.parse(saved));
  },[])

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      {/* HEADER */}
      <header style={{position:'sticky', top:0, background:'#000', padding:'16px', borderBottom:'1px solid #222', zIndex:10}}>
        <h1 style={{fontSize:'24px', fontWeight:'bold', color:'#ef4444'}}>Pulse360</h1>
        <div style={{display:'flex', gap:'12px', marginTop:'12px', flexWrap:'wrap'}}>
          <button onClick={()=>{setFilter('top'); setSelectedNews(null)}} style={{padding:'8px 16px', borderRadius:'999px', background:filter==='top'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer'}}>Home</button>
          <button onClick={()=>{setFilter('andhra'); setSelectedNews(null)}} style={{padding:'8px 16px', borderRadius:'999px', background:filter==='andhra'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer'}}>AP News</button>
          <button onClick={()=>{setFilter('sports'); setSelectedNews(null)}} style={{padding:'8px 16px', borderRadius:'999px', background:filter==='sports'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer'}}>Sports</button>
        </div>
      </header>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'16px', flex:1, width:'100%'}}>
        {/* NEWS DETAIL PAGE */}
        {selectedNews? (
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
            <button onClick={()=>setSelectedNews(null)} style={{marginBottom:'16px', padding:'8px 16px', background:'#1f2937', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer'}}>← Back</button>
            <img src={selectedNews.image || 'https://via.placeholder.com/800x400'} style={{width:'100%', height:'320px', objectFit:'cover', borderRadius:'12px'}}/>
            <h2 style={{fontSize:'28px', fontWeight:'bold', marginTop:'16px'}}>{selectedNews.title}</h2>
            <p style={{color:'#9ca3af', fontSize:'14px', marginTop:'8px'}}>{selectedNews.source?.name} • {new Date(selectedNews.publishedAt).toLocaleString('en-IN')}</p>
            <p style={{marginTop:'16px', fontSize:'18px', lineHeight:'1.8'}}>{selectedNews.description}</p>
            <p style={{marginTop:'8px', color:'#d1d5db'}}>{selectedNews.content?.replace('[+...]', '')}</p>

            <div style={{marginTop:'24px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <button onClick={()=>shareWhatsApp(selectedNews.title, selectedNews.url)} style={{padding:'10px 16px', background:'#16a34a', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer'}}>📲 WhatsApp Share</button>
              <a href={selectedNews.url} target="_blank" style={{padding:'10px 16px', background:'#1f2937', color:'#fff', borderRadius:'8px', textDecoration:'none'}}>Original Source</a>
            </div>

            <div style={{marginTop:'32px', borderTop:'1px solid #222', paddingTop:'16px'}}>
              <h3 style={{fontSize:'20px', fontWeight:'bold'}}>Comments</h3>
              <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
                <input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Write a comment..." style={{flex:1, padding:'10px', background:'#111', border:'1px solid #222', borderRadius:'8px', color:'#fff'}}/>
                <button onClick={()=>addComment(selectedNews.url)} style={{padding:'10px 20px', background:'#dc2626', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer'}}>Post</button>
              </div>
              <div style={{marginTop:'16px'}}>
                {(comments[selectedNews.url] || []).map((c,i)=>(
                  <div key={i} style={{background:'#111', padding:'12px', borderRadius:'8px', border:'1px solid #222', marginTop:'8px'}}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* NEWS GRID - FIXED HEIGHT CARDS */
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px'}}>
            {allNews.length === 0? <p style={{textAlign:'center'}}>Loading news...</p> :
              allNews.map((article, i) => (
                <div
                  key={i}
                  onClick={()=>setSelectedNews(article)}
                  style={{background:'#111', borderRadius:'12px', overflow:'hidden', cursor:'pointer', display:'flex', flexDirection:'column', height:'420px'}}
                >
                  {/* IMAGE FIXED */}
                  <div style={{width:'100%', height:'200px', overflow:'hidden'}}>
                    <img src={article.image || 'https://via.placeholder.com/400x250'} style={{width:'100%', height:'200px', objectFit:'cover'}} alt=""/>
                  </div>

                  {/* CONTENT FIXED */}
                  <div style={{padding:'16px', display:'flex', flexDirection:'column', flex:1}}>
                    <p style={{fontSize:'12px', color:'#9ca3af'}}>{article.source?.name}</p>
                    <h3 style={{fontSize:'16px', fontWeight:'bold', marginTop:'4px', height:'48px', overflow:'hidden'}}>{article.title}</h3>
                    <p style={{fontSize:'14px', color:'#d1d5db', marginTop:'8px', height:'60px', overflow:'hidden'}}>{article.description}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{background:'#020202', borderTop:'1px solid #222', marginTop:'40px', padding:'24px 0'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#9ca3af', fontSize:'14px'}}>© 2026 Pulse360 Andhra Pradesh. All Rights Reserved.</p>
          <p style={{color:'#6b7280', fontSize:'12px', marginTop:'8px'}}>Developed by Narasimha Rao</p>
        </div>
      </footer>
    </div>
  )
}
