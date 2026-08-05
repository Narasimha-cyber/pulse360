'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [liveNews, setLiveNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breakingIndex, setBreakingIndex] = useState(0);

  // Nuv rayalsina 2 articles
  const ourArticles = [
    {
      id: 'our-1',
      region: 'OurArticles',
      title: "Eluru lo New Super Specialty Hospital Opening Next Month",
      category: "Local",
      summary: "Eluru govt hospital ki 100 kotlu tho new building kattaru. 200 beds extra.",
      content: "Full article: Eluru MLA today announced new super specialty hospital will open next month with 200 beds and latest equipment. People of West Godavari will get better treatment.",
      date: "Aug 4, 2026",
      url: "#"
    },
    {
      id: 'our-2',
      region: 'OurArticles',
      title: "AP lo 50,000 Govt Jobs Notification Released",
      category: "Jobs",
      summary: "APPSC released notification for Group 1, Group 2 and Group 3 posts.",
      content: "Full article: Andhra Pradesh Public Service Commission released 50,000 vacancies. Last date to apply is Aug 30. Visit appsc.gov.in for details.",
      date: "Aug 4, 2026",
      url: "#"
    },
  ];

  // Breaking News
 const [breakingNews, setBreakingNews] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setBreakingIndex(prev => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [breakingNews]);
 // Live Breaking News Fetch
useEffect(() => {
  const fetchBreaking = async () => {
    try {
      const res = await fetch(`/api/news?tab=breaking`);
      const data = await res.json();
      
      const liveBreaking = data.news?.slice(0, 5).map(item => `🚨 ${item.title}`) || [];
      
      if(liveBreaking.length > 0){
        setBreakingNews(liveBreaking);
      } else {
        setBreakingNews([
          "🚨 AP Inter Results Released Today",
          "🚨 Farmers to get Rs 20,000 under Annadata Sukhibhava",
          "🚨 India Won T20 World Cup 2026"
        ]);
      }
    } catch (error) {
      console.log("Breaking News Error:", error);
    }
  };
  
  fetchBreaking();
  const interval = setInterval(fetchBreaking, 60000); // 1 min ki update
  return () => clearInterval(interval);
}, []);
  // Live News Fetch from our Route
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let tabParam = 'all';
        if(activeTab === 'AP') tabParam = 'AP';
        else if(activeTab === 'India') tabParam = 'India';

        const res = await fetch(`/api/news?tab=${tabParam}`);
        const data = await res.json();

        const apiArticles = data.news?.map((item, i) => ({
          id: `api-${activeTab}-${i}-${Date.now()}`,
          region: activeTab === 'AP'? 'AP' : 'India',
          title: item.title,
          category: "Live",
          summary: item.description?.slice(0,150) + "...",
          content: item.description,
          date: new Date(item.published).toLocaleDateString(),
          url: item.url,
          image: item.image
        })) || [];

        if(activeTab === 'All') {
          setLiveNews([...ourArticles,...apiArticles]);
        } else if(activeTab === 'OurArticles') {
          setLiveNews(ourArticles);
        } else {
          setLiveNews(apiArticles);
        }
      } catch (error) {
        console.log("Error:", error);
        setLiveNews(ourArticles);
      }
      setLoading(false);
    };
    fetchNews();
  }, [activeTab]);

  const colors = {
    bg: darkMode? '#0a0a0a' : '#ffffff',
    text: darkMode? '#ffffff' : '#000',
    card: darkMode? '#1a1a1a' : '#f9f9f9',
    border: darkMode? '#222' : '#ddd',
    muted: darkMode? '#aaa' : '#555'
  };

  const filteredArticles = liveNews.filter(article =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (id) => setLikes(prev => ({...prev, [id]: (prev[id] || 0) + 1}));

  const handleComment = (id) => {
    if(!newComment[id]) return;
    setComments(prev => ({...prev, [id]: [...(prev[id] || []), newComment[id]]}));
    setNewComment(prev => ({...prev, [id]: ''}))
  };

  const handleWhatsAppShare = (title, url) => {
    const shareUrl = url === "#"? window.location.href : url;
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + shareUrl)}`, '_blank');
  };

  const tabs = ['All', 'AP', 'India', 'OurArticles'];

  return (
    <main style={{
      width:'100%',
      background:colors.bg,
      color:colors.text,
      minHeight:'100vh',
      fontFamily:'system-ui'
    }}>
     {/* Header */}
      <header style={{position:'sticky', top:0, zIndex:10, background:colors.bg, borderBottom:`1px solid ${colors.border}`}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          
          {/* LOGO + NAME */}
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
           <img src="/logo.svg" alt="Pulse360 Logo" style={{width:'80px', height:'80px', objectFit:'contain'}} />
            <h1 style={{fontSize:'28px', fontWeight:'bold', color:'#3b82f6'}}>Pulse360</h1>
          </div>

          <button onClick={()=>setDarkMode(!darkMode)} style={{fontSize:'22px', background:'none', border:'none', cursor:'pointer'}}>{darkMode? '☀️' : '🌙'}</button>
        </div>
        {/* Breaking News */}
        <div style={{background:'linear-gradient(90deg, #ef4444, #dc2626)', color:'#fff', padding:'12px 0', textAlign:'center', fontWeight:'bold', fontSize:'14px'}}>
          {breakingNews[breakingIndex]}
        </div>

        {/* Search */}
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'16px 20px'}}>
          <input type="text" placeholder="Search news..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{width:'100%', padding:'12px 16px', borderRadius:'10px', border:`1px solid ${colors.border}`, background:colors.card, color:colors.text, fontSize:'15px'}} />
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap:'10px', justifyContent:'center', padding:'0 20px 16px', flexWrap:'wrap'}}>
          {tabs.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ padding:'10px 18px', borderRadius:'8px', border:'none', background: activeTab === tab? '#3b82f6' : colors.card, color: activeTab === tab? '#fff' : colors.text, fontWeight:'600', cursor:'pointer' }} >
              {tab === 'AP'? 'Andhra Pradesh' : tab === 'India'? 'India News' : tab === 'OurArticles'? 'Our Articles' : 'All News'}
            </button>
          ))}
        </div>
      </header>

      {/* News Grid - FIXED for Mobile Center */}
      <section style={{maxWidth:'1200px', margin:'0 auto', padding:'32px 16px'}}>
        <h2 style={{textAlign:'center', marginBottom:'24px', fontSize:'24px'}}>
          {activeTab === 'AP'? 'AP Live News' : activeTab === 'India'? 'India Live News' : activeTab === 'OurArticles'? 'Our Articles' : 'Latest News'}
        </h2>

        {loading? <p style={{textAlign:'center', fontSize:'18px'}}>Loading Live News...</p> :
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'24px', justifyItems: 'center'}}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{background:colors.card, padding:'20px', borderRadius:'16px', border:`1px solid ${colors.border}`, display:'flex', flexDirection:'column', width:'100%', maxWidth:'400px'}}>
              {article.image && <img src={article.image} alt={article.title} style={{width:'100%', height:'200px', objectFit:'cover', borderRadius:'10px', marginBottom:'12px'}}/>}
              <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
                <span style={{fontSize:'11px', background: article.region === 'India'? '#ef4444' : article.region === 'AP'? '#3b82f6' : '#10b981', color:'#fff', padding:'4px 10px', borderRadius:'6px', fontWeight:'600'}}>{article.region}</span>
                <span style={{fontSize:'11px', color:colors.muted}}>{article.date}</span>
              </div>
              <h3 style={{fontSize:'18px', marginBottom:'10px', lineHeight:'1.4'}}>{article.title}</h3>
              <p style={{fontSize:'14px', color:colors.muted, marginBottom:'16px', flexGrow:1}}>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{color:'#3b82f6', fontWeight:'600', marginBottom:'12px', textDecoration:'none'}}>Read More →</a>

              {/* Ad Slot 1 - Added for AdSense */}
              <div style={{width:'100%', height:'90px', background: colors.border, borderRadius:'8px', margin:'12px 0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color: colors.muted}}>
                Ad Slot 1
              </div>

              {/* Like + Share */}
              <div style={{display:'flex', gap:'10px', marginBottom:'12px', flexWrap:'wrap'}}>
                <button onClick={()=>handleLike(article.id)} style={{padding:'8px 12px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, cursor:'pointer'}}>❤️ Like ({likes[article.id] || 0})</button>
                <button onClick={()=>handleWhatsAppShare(article.title, article.url)} style={{padding:'8px 12px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:'#25D366', color:'#fff', cursor:'pointer'}}>📲 WhatsApp</button>
              </div>

              {/* Comments */}
              <div style={{borderTop:`1px solid ${colors.border}`, paddingTop:'12px'}}>
                <input type="text" placeholder="Add comment..." value={newComment[article.id] || ''} onChange={(e)=>setNewComment(prev=>({...prev, [article.id]: e.target.value}))} style={{width:'100%', padding:'8px', borderRadius:'6px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text, marginBottom:'8px'}} />
                <button onClick={()=>handleComment(article.id)} style={{padding:'6px 12px', borderRadius:'6px', background:'#3b82f6', color:'#fff', border:'none', cursor:'pointer'}}>Comment</button>
                {(comments[article.id] || []).map((c,i)=><p key={i} style={{fontSize:'13px', marginTop:'6px'}}>💬 {c}</p>)}
              </div>
            </div>
          ))}
        </div>}

        {/* Ad Slot 2 - Added for AdSense */}
        <div style={{width:'100%', height:'250px', background: colors.border, borderRadius:'8px', margin:'32px 0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', color: colors.muted}}>
          Ad Slot 2 - Footer Banner
        </div>
      </section>

      {/* Footer with Legal Pages - Added for AdSense */}
      <footer style={{background: colors.card, borderTop:`1px solid ${colors.border}`, textAlign:'center', padding:'32px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{display:'flex', gap:'20px', justifyContent:'center', marginBottom:'16px', flexWrap:'wrap'}}>
            <Link href="/about" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>About Us</Link>
            <Link href="/contact" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>Contact</Link>
            <Link href="/privacy-policy" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>Privacy Policy</Link>
          </div>
          <p style={{color:'#9ca3af', fontSize:'14px', margin:0}}>© 2026 Pulse360. All rights reserved.</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'8px 0 0'}}>Made with ❤️ in INDIA - ANDHRA PRADESH - ELURU</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'4px 0 0'}}>Developed by Narasimha Rao Killi</p>
        </div>
      </footer>
    </main>
  )
}
