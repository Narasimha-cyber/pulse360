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
  const [topReporter, setTopReporter] = useState({name: 'Narasimha Rao', posts: 24});
  const [showMonthlyBanner, setShowMonthlyBanner] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitData, setSubmitData] = useState({
    name: '',
    phone: '',
    title: '',
    description: '',
    photo: null
  });

// IDHI KOTHA GA ADD CHEY
useEffect(() => {
  const today = new Date();
  if(today.getDate() === 1){
    setShowMonthlyBanner(true);
    setTimeout(() => setShowMonthlyBanner(false), 24 * 60 * 60 * 1000); // 24 hours
  }
}, []);

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

  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreakingIndex(prev => breakingNews.length? (prev + 1) % breakingNews.length : 0);
    }, 4000);
    return () => clearInterval(interval);
  }, [breakingNews]);

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
      } catch (error) { console.log("Breaking News Error:", error); }
    };
    fetchBreaking();
    const interval = setInterval(fetchBreaking, 60000);
    return () => clearInterval(interval);
  }, []);

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

        if(activeTab === 'All') setLiveNews([...ourArticles,...apiArticles]);
        else if(activeTab === 'OurArticles') setLiveNews(ourArticles);
        else setLiveNews(apiArticles);
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
 const [topReporter, setTopReporter] = useState({name: 'Narasimha Rao', posts: 24});
const [showMonthlyBanner, setShowMonthlyBanner] = useState(false);

useEffect(() => {
  const today = new Date();
  if(today.getDate() === 1){
    setShowMonthlyBanner(true);
    setTimeout(() => setShowMonthlyBanner(false), 24 * 60 * 60 * 1000);
  }
}, []);

const handleSubmitNews = (e) => {
    e.preventDefault();
    
    const newArticle = {
      id: `our-${Date.now()}`,
      region: 'OurArticles', // <-- Iddhe key. All lo raadu
      title: submitData.title,
      category: "User Submit",
      summary: submitData.description.slice(0,150) + "...",
      content: submitData.description,
      date: new Date().toLocaleDateString(),
      url: "#",
      author: submitData.name
    };
    
    setLiveNews(prev => [newArticle, ...prev]);
    alert('News submitted successfully! Eluru section lo kanipisthundi');
    setShowSubmitForm(false);
    setSubmitData({name:'', phone:'', title:'', description:'', photo:null});
  };

  const tabs = ['All', 'AP', 'India', 'OurArticles'];
  return (
    <main style={{ width:'100%', background:colors.bg, color:colors.text, minHeight:'100vh', fontFamily:'system-ui' }}>
{/* Monthly Best Reporter Banner - Month 1st 24 hours */}
      {showMonthlyBanner && (
        <div style={{background:'linear-gradient(90deg, #f59e0b, #d97706)', color:'#fff', padding:'16px', textAlign:'center', fontWeight:'bold', fontSize:'15px'}}>
          🏆 Congratulations {topReporter.name}! 
          You are "{new Date().toLocaleString('default', { month: 'long' })} 2026 Best Reporter" 
          with {topReporter.posts} posts. Thank you for being part of our Pulse360 Community! 🏆
        </div>
      )}
      {/* Submit News Modal */}
      {showSubmitForm && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
          <div style={{background:colors.card, padding:'24px', borderRadius:'16px', maxWidth:'500px', width:'100%'}}>
            <h2 style={{marginBottom:'16px'}}>Submit Your News</h2>
            <form onSubmit={handleSubmitNews}>
              <input type="text" placeholder="Your Name" required value={submitData.name} onChange={e=>setSubmitData({...submitData, name:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text}}/>
              <input type="tel" placeholder="Phone Number" required value={submitData.phone} onChange={e=>setSubmitData({...submitData, phone:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text}}/>
              <input type="text" placeholder="News Title" required value={submitData.title} onChange={e=>setSubmitData({...submitData, title:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text}}/>
              <textarea placeholder="News Description" required rows="4" value={submitData.description} onChange={e=>setSubmitData({...submitData, description:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text}}/>
              <input type="file" onChange={e=>setSubmitData({...submitData, photo:e.target.files[0]})} style={{marginBottom:'16px', color:colors.text}}/>
              <div style={{display:'flex', gap:'10px'}}>
                <button type="submit" style={{flex:1, padding:'10px', background:'#3b82f6', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600'}}>Submit</button>
                <button type="button" onClick={()=>setShowSubmitForm(false)} style={{flex:1, padding:'10px', background:colors.border, color:colors.text, border:'none', borderRadius:'8px', cursor:'pointer'}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header - MOBILE FIXED */}
      <header style={{position:'sticky', top:0, zIndex:10, background:colors.bg, borderBottom:`1px solid ${colors.border}`}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <div style={{ width: '180px', height: '45px', backgroundImage: 'url(/logo.svg)', backgroundSize: '40%', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center' }}></div>
            <h1 style={{fontSize:'22px', fontWeight:'bold', color:'#3b82f6'}}>Pulse360</h1>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <button onClick={() => setShowSubmitForm(true)} style={{padding:'8px 12px', background:'#3b82f6', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600', fontSize:'13px'}}>Submit News</button>
            <button onClick={()=>setDarkMode(!darkMode)} style={{fontSize:'20px', background:'none', border:'none', cursor:'pointer'}}>{darkMode? '☀️' : '🌙'}</button>
          </div>
        </div>

        {/* Eluru / All News Toggle - NEW */}
        <div style={{display:'flex', gap:'8px', justifyContent:'center', padding:'10px 16px', background:colors.card}}>
          <button onClick={()=>setActiveTab('All')} style={{padding:'8px 16px', borderRadius:'8px', border:'none', background: activeTab === 'All'? '#3b82f6' : colors.border, color: activeTab === 'All'? '#fff' : colors.text, fontWeight:'600', cursor:'pointer'}}>All News</button>
          <button onClick={()=>setActiveTab('OurArticles')} style={{padding:'8px 16px', borderRadius:'8px', border:'none', background: activeTab === 'OurArticles'? '#ef4444' : colors.border, color: activeTab === 'OurArticles'? '#fff' : colors.text, fontWeight:'600', cursor:'pointer'}}>Eluru</button>
        </div>

        {/* Breaking News */}
        <div style={{background:'linear-gradient(90deg, #ef4444, #dc2626)', color:'#fff', padding:'10px 0', textAlign:'center', fontWeight:'bold', fontSize:'13px'}}>
          {breakingNews[breakingIndex]}
        </div>

        {/* Search */}
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'12px 16px'}}>
          <input type="text" placeholder="Search news..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{width:'100%', padding:'10px 14px', borderRadius:'10px', border:`1px solid ${colors.border}`, background:colors.card, color:colors.text, fontSize:'14px'}} />
        </div>

        {/* Other Tabs */}
        <div style={{display:'flex', gap:'8px', justifyContent:'center', padding:'0 16px 12px', flexWrap:'wrap'}}>
          {['AP', 'India'].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ padding:'8px 14px', borderRadius:'8px', border:'none', background: activeTab === tab? '#3b82f6' : colors.card, color: activeTab === tab? '#fff' : colors.text, fontWeight:'600', cursor:'pointer', fontSize:'13px' }}>
              {tab === 'AP'? 'AP' : 'India'}
            </button>
          ))}
        </div>
      </header>

      {/* News Grid */}
      <section style={{maxWidth:'1200px', margin:'0 auto', padding:'24px 16px'}}>
        <h2 style={{textAlign:'center', marginBottom:'20px', fontSize:'22px'}}>
          {activeTab === 'AP'? 'AP Live News' : activeTab === 'India'? 'India Live News' : activeTab === 'OurArticles'? 'Eluru News' : 'Latest News'}
        </h2>
        {loading? <p style={{textAlign:'center', fontSize:'18px'}}>Loading Live News...</p> :
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', justifyItems: 'center'}}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{background:colors.card, padding:'18px', borderRadius:'16px', border:`1px solid ${colors.border}`, display:'flex', flexDirection:'column', width:'100%', maxWidth:'400px'}}>
              {article.image && <img src={article.image} alt={article.title} style={{width:'100%', height:'180px', objectFit:'cover', borderRadius:'10px', marginBottom:'10px'}}/>}
              <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
                <span style={{fontSize:'11px', background: article.region === 'India'? '#ef4444' : article.region === 'AP'? '#3b82f6' : '#10b981', color:'#fff', padding:'4px 10px', borderRadius:'6px', fontWeight:'600'}}>{article.region}</span>
                <span style={{fontSize:'11px', color:colors.muted}}>{article.date}</span>
              </div>
            <h3 style={{fontSize:'17px', marginBottom:'8px', lineHeight:'1.4'}}>
  {article.title}
  {article.author === topReporter.name && (
    <span style={{marginLeft:'8px', fontSize:'11px', background:'#f59e0b', color:'#fff', padding:'3px 8px', borderRadius:'6px'}}>👑 Best Reporter</span>
  )}
</h3>
              <p style={{fontSize:'14px', color:colors.muted, marginBottom:'14px', flexGrow:1}}>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{color:'#3b82f6', fontWeight:'600', marginBottom:'10px', textDecoration:'none'}}>Read More →</a>
              <div style={{width:'100%', height:'90px', background: colors.border, borderRadius:'8px', margin:'10px 0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color: colors.muted}}>Ad Slot</div>
              <div style={{display:'flex', gap:'8px', marginBottom:'10px', flexWrap:'wrap'}}>
                <button onClick={()=>handleLike(article.id)} style={{padding:'6px 10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:colors.bg, cursor:'pointer', fontSize:'13px'}}>❤️ Like ({likes[article.id] || 0})</button>
                <button onClick={()=>handleWhatsAppShare(article.title, article.url)} style={{padding:'6px 10px', borderRadius:'8px', border:`1px solid ${colors.border}`, background:'#25D366', color:'#fff', cursor:'pointer', fontSize:'13px'}}>📲 Share</button>
              </div>
              <div style={{borderTop:`1px solid ${colors.border}`, paddingTop:'10px'}}>
                <input type="text" placeholder="Add comment..." value={newComment[article.id] || ''} onChange={(e)=>setNewComment(prev=>({...prev, [article.id]: e.target.value}))} style={{width:'100%', padding:'8px', borderRadius:'6px', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.text, marginBottom:'8px', fontSize:'13px'}} />
                <button onClick={()=>handleComment(article.id)} style={{padding:'6px 12px', borderRadius:'6px', background:'#3b82f6', color:'#fff', border:'none', cursor:'pointer', fontSize:'13px'}}>Comment</button>
                {(comments[article.id] || []).map((c,i)=><p key={i} style={{fontSize:'13px', marginTop:'6px'}}>💬 {c}</p>)}
              </div>
            </div>
          ))}
        </div>}
        <div style={{width:'100%', height:'250px', background: colors.border, borderRadius:'8px', margin:'24px 0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', color: colors.muted}}>Ad Slot - Footer Banner</div>
      </section>

      {/* Footer */}
      <footer style={{background: colors.card, borderTop:`1px solid ${colors.border}`, textAlign:'center', padding:'24px 16px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', marginBottom:'14px', flexWrap:'wrap'}}>
            <Link href="/about" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>About Us</Link>
            <Link href="/contact" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>Contact</Link>
            <Link href="/privacy" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>Privacy Policy</Link>
            <Link href="/terms" style={{color:'#3b82f6', textDecoration:'none', fontSize:'14px'}}>Terms</Link>
          </div>
          <p style={{color:'#9ca3af', fontSize:'14px', margin:0}}>© 2026 Pulse360. All rights reserved.</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'6px 0 0'}}>Made with ❤️ in ELURU, Andhra Pradesh ❤️ Narasimha Rao Killi </p>
        </div>
      </footer>
    </main>
  )
}
