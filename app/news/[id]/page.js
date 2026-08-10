'use client'
import { useEffect, useState } from 'react'

export default function NewsDetail({ params }) {
  const { id } = params;
  const [news, setNews] = useState(null);

  // 1. Ads load cheyyadaniki
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({})
      (adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {}
  }, [])

  // 2. API nunchi data theesukovadam
  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, { cache: 'no-store' });
      const data = await res.json();
      setNews(data);
    }
    fetchNews();
  }, [id])

  if(!news) return <p style={{color: 'white', textAlign: 'center', padding: 50}}>Loading...</p>

  return (
    <div style={{maxWidth: 800, margin: 'auto', padding: 20, background: '#000', color: '#fff', minHeight: '100vh'}}>
      
      <h1 style={{fontSize: 28, fontWeight: 'bold', lineHeight: 1.4}}>{news.title}</h1>
      <p style={{color: '#aaa', fontSize: 14, marginTop: 8}}>Source: {news.sourceName} | {news.date}</p>

      {/* 3. SUMMARY - 100 words */}
      <p style={{lineHeight: 1.8, marginTop: 20, fontSize: 16}}>{news.summary || news.aiSummary}</p>

      {/* 4. AD SLOT 1 - Title + Summary kinda */}
      <div style={{margin: '30px 0'}}>
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-3333852580308958"
             data-ad-slot="3283435154"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* 5. GO TO SOURCE BUTTON - Idhe important */}
      <a 
        href={news.sourceUrl}
        target="_blank"
        rel="nofollow noopener"
        style={{display: 'block', textAlign: 'center', padding: 14, background: '#00aaff', color: 'white', borderRadius:8, textDecoration: 'none', fontWeight: 'bold', margin: '30px 0'}}
      >
        Read Full Article on {news.sourceName} →
      </a>

      {/* 6. AD SLOT 2 - Button tarvata */}
      <div style={{margin: '30px 0'}}>
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-3333852580308958"
             data-ad-slot="5641739251"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

    </div>
  )
}
