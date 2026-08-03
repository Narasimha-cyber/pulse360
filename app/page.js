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
    <div className="bg-black text-white min-h-screen flex-col">
      {/* HEADER */}
      <header className="sticky top-0 bg-black p-4 border-b border-gray-800 z-10">
        <h1 className="text-2xl font-bold text-red-500">Pulse360</h1>
        <div className="flex gap-4 mt-3 flex-wrap">
          <button onClick={()=>{setFilter('top'); setSelectedNews(null)}} className={`px-4 py-2 rounded-full ${filter==='top'?'bg-red-600':'bg-gray-800'}`}>Home</button>
          <button onClick={()=>{setFilter('andhra'); setSelectedNews(null)}} className={`px-4 py-2 rounded-full ${filter==='andhra'?'bg-red-600':'bg-gray-800'}`}>AP News</button>
          <button onClick={()=>{setFilter('sports'); setSelectedNews(null)}} className={`px-4 py-2 rounded-full ${filter==='sports'?'bg-red-600':'bg-gray-800'}`}>Sports</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 flex-1 w-full">
        {/* NEWS DETAIL PAGE */}
        {selectedNews? (
          <div>
            <button onClick={()=>setSelectedNews(null)} className="mb-4 px-4 py-2 bg-gray-800 rounded">← Back</button>
            <img src={selectedNews.image || 'https://via.placeholder.com/800x400'} className="w-full h-80 object-cover rounded-xl"/>
            <h2 className="text-3xl font-bold mt-4">{selectedNews.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{selectedNews.source?.name} • {new Date(selectedNews.publishedAt).toLocaleString()}</p>
            <p className="mt-4 text-lg leading-8">{selectedNews.description}</p>
            <p className="mt-4">{selectedNews.content}</p>

            <div className="mt-6 flex gap-4 flex-wrap">
              <button onClick={()=>shareWhatsApp(selectedNews.title, selectedNews.url)} className="px-4 py-2 bg-green-600 rounded-lg">📲 WhatsApp Share</button>
              <a href={selectedNews.url} target="_blank" className="px-4 py-2 bg-gray-800 rounded-lg">Original Source</a>
            </div>

            <div className="mt-8 border-t border-gray-800 pt-4">
              <h3 className="text-xl font-bold">Comments</h3>
              <div className="flex gap-2 mt-3">
                <input
                  value={commentText}
                  onChange={e=>setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-2 bg-gray-900 rounded outline-none"
                />
                <button onClick={()=>addComment(selectedNews.url)} className="px-4 bg-red-600 rounded">Post</button>
              </div>
              <div className="mt-4 space-y-2">
                {(comments[selectedNews.url] || []).map((c,i)=>(
                  <div key={i} className="bg-gray-900 p-3 rounded">{c}</div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* NEWS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNews.length === 0? <p>Loading news...</p> :
              allNews.map((article, i) => (
                <div
                  key={i}
                  onClick={()=>setSelectedNews(article)}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition cursor-pointer"
                >
                  <img src={article.image || 'https://via.placeholder.com/400x250'} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <p className="text-xs text-gray-400">{article.source?.name}</p>
                    <h3 className="text-lg font-bold mt-1 line-clamp-2">{article.title}</h3>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>

      {/* FOOTER - IDI KOTHAGA ADD CHESANU */}
      <footer className="bg-gray-950 border-t border-gray-800 mt-10 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Pulse360 Andhra Pradesh. All Rights Reserved.</p>
          <p className="text-gray-500 text-xs mt-2">Developed by Narasimha Rao Killi </p>
        </div>
      </footer>
    </div>
  )
}
