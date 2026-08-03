'use client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [filter, setFilter] = useState('top');
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');

  // News Fetch
  useEffect(() => {
    setLoading(true);
    setAllNews([]);
    let apiUrl = '/api/news';
    if(filter === 'andhra') apiUrl = '/api/news?type=andhra';
    if(filter === 'sports') apiUrl = '/api/news?type=sports';

    fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
      setAllNews(data.articles || []);
      setLoading(false);
   })
  .catch(err => {
      console.log(err);
      setLoading(false);
   })
  }, [filter]);

  // WhatsApp share
  const shareWhatsApp = (title, url) => {
    const text = `*Pulse360 News*\n\n${title}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  // Comment add
  const addComment = (id) => {
    if(!commentText.trim()) return;
    const newComments = {...comments};
    if(!newComments[id]) newComments[id] = [];
    newComments[id].push({text: commentText, time: new Date().toLocaleString('en-IN')});
    setComments(newComments);
    setCommentText('');
    localStorage.setItem('newsComments', JSON.stringify(newComments));
  }

  // Load comments from localStorage
  useEffect(()=>{
    const saved = localStorage.getItem('newsComments');
    if(saved) setComments(JSON.parse(saved));
  },[])

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', display:'flex', flexDirection:'column', fontFamily:'Arial, sans-serif'}}>

      {/* HEADER */}
      <header style={{position:'sticky', top:0, background:'#000', padding:'16px 20px', borderBottom:'1px solid #222', zIndex:10}}>
        <h1 style={{fontSize:'28px', fontWeight:'bold', color:'#ef4444', margin:0}}>Pulse360</h1>
        <div style={{display:'flex', gap:'12px', marginTop:'12px', flexWrap:'wrap'}}>
          <button onClick={()=>{setFilter('top'); setSelectedNews(null)}} style={{padding:'8px 18px', borderRadius:'999px', background:filter==='top'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer', fontWeight:'500'}}>Home</button>
          <button onClick={()=>{setFilter('andhra'); setSelectedNews(null)}} style={{padding:'8px 18px', borderRadius:'999px', background:filter==='andhra'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer', fontWeight:'500'}}>AP News</button>
          <button onClick={()=>{setFilter('sports'); setSelectedNews(null)}} style={{padding:'8px 18px', borderRadius:'999px', background:filter==='sports'?'#dc2626':'#1f2937', color:'#fff', border:'none', cursor:'pointer', fontWeight:'500'}}>Sports</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'20px', flex:1, width:'100%'}}>

        {/* NEWS DETAIL PAGE */}
        {selectedNews? (
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
            <button onClick={()=>setSelectedNews(null)} style={{marginBottom:'16px', padding:'8px 16px', background:'#1f2937', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer'}}>← Back to News</button>

            <img src={selectedNews.image || 'https://via.placeholder.com/800x400'} style={{width:'100%', height:'400px', objectFit:'cover', borderRadius:'12px'}} alt={selectedNews.title}/>

            <h2 style={{fontSize:'32px', fontWeight:'bold', marginTop:'20px', lineHeight:'1.3'}}>{selectedNews.title}</h2>
            <p style={{color:'#9ca3af', fontSize:'14px', marginTop:'10px'}}>{selectedNews.source?.name} • {new Date(selectedNews.publishedAt).toLocaleString('en-IN')}</p>
            <p style={{marginTop:'20px', fontSize:'18px', lineHeight:'1.8'}}>{selectedNews.description}</p>
            <p style={{marginTop:'10px', color:'#d1d5db', lineHeight:'1.7'}}>{selectedNews.content?.replace('[+...]', '')}</p>

            {/* WHATSAPP SHARE BUTTON */}
            <div style={{marginTop:'24px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <button onClick={()=>shareWhatsApp(selectedNews.title, selectedNews.url)} style={{padding:'12px 20px', background:'#25D366', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer', fontWeight:'bold', fontSize:'16px'}}>📲 Share on WhatsApp</button>
              <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" style={{padding:'12px 20px', background:'#1f2937', color:'#fff', borderRadius:'8px', textDecoration:'none', fontWeight:'500'}}>Read Original</a>
            </div>

            {/* COMMENT BOX */}
            <div style={{marginTop:'40px', borderTop:'1px solid #222', paddingTop:'20px'}}>
              <h3 style={{fontSize:'22px', fontWeight:'bold', marginBottom:'16px'}}>Comments</h3>
              <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                <input
                  value={commentText}
                  onChange={e=>setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  style={{flex:1, padding:'12px', background:'#111', border:'1px solid #333', borderRadius:'8px', color:'#fff', outline:'none'}}
                  onKeyPress={e => e.key === 'Enter' && addComment(selectedNews.url)}
                />
                <button onClick={()=>addComment(selectedNews.url)} style={{padding:'12px 24px', background:'#dc2626', border:'none', color:'#fff', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Post</button>
              </div>
              <div>
                {(comments[selectedNews.url] || []).length === 0?
                  <p style={{color:'#6b7280'}}>Be the first to comment</p> :
                  (comments[selectedNews.url] || []).map((c,i)=>(
                    <div key={i} style={{background:'#111', padding:'14px', borderRadius:'8px', border:'1px solid #222', marginBottom:'10px'}}>
                      <p style={{margin:0}}>{c.text}</p>
                      <p style={{fontSize:'12px', color:'#6b7280', margin:'5px 0 0 0'}}>{c.time}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ) : (
          /* NEWS GRID - FIXED HEIGHT CARDS */
          <div>
            {loading?
              <p style={{textAlign:'center', fontSize:'18px', marginTop:'50px'}}>Loading news...</p> :
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px'}}>
                {allNews.length === 0?
                  <p style={{textAlign:'center', gridColumn:'1/-1'}}>No news found. Check API Key.</p> :
                  allNews.map((article, i) => (
                    <div
                      key={i}
                      onClick={()=>setSelectedNews(article)}
                      style={{background:'#111', borderRadius:'12px', overflow:'hidden', cursor:'pointer', display:'flex', flexDirection:'column', height:'430px', border:'1px solid #222'}}
                    >
                      <div style={{width:'100%', height:'200px', overflow:'hidden'}}>
                        <img src={article.image || 'https://via.placeholder.com/400x250'} style={{width:'100%', height:'200px', objectFit:'cover'}} alt={article.title}/>
                      </div>
                      <div style={{padding:'16px', display:'flex', flexDirection:'column', flex:1}}>
                        <p style={{fontSize:'12px', color:'#9ca3af', margin:0}}>{article.source?.name}</p>
                        <h3 style={{fontSize:'16px', fontWeight:'bold', margin:'8px 0', height:'48px', overflow:'hidden'}}>{article.title}</h3>
                        <p style={{fontSize:'14px', color:'#d1d5db', margin:0, height:'60px', overflow:'hidden'}}>{article.description}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            }
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{background:'#020202', borderTop:'1px solid #222', marginTop:'40px', padding:'24px 0'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center', padding:'0 20px'}}>
          <p style={{color:'#9ca3af', fontSize:'14px', margin:0}}>© 2026 Pulse360 Andhra Pradesh. All Rights Reserved.</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'8px 0 0 0'}}>Developed by Narasimha Rao Killi </p>
        </div>
      </footer>
    </div>
  )
}
