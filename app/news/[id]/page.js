export default async function NewsDetail({ params }) {
  const { id } = params;

  // 1. Nee API nunchi data theesukovadam
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, { cache: 'no-store' });
  const news = await res.json();

  if(!news) return <p style={{color: 'white', textAlign: 'center', padding: 50}}>Loading...</p>

  return (
    <div style={{maxWidth: 800, margin: 'auto', padding: 20, background: '#000', color: '#fff', minHeight: '100vh'}}>

      <h1 style={{fontSize: 28, fontWeight: 'bold', lineHeight: 1.4}}>{news.title}</h1>
      <p style={{color: '#aaa', fontSize: 14, marginTop: 8}}>Source: {news.sourceName}</p>

      {/* 2. SUMMARY - 100 words */}
      <p style={{lineHeight: 1.8, marginTop: 20, fontSize: 16}}>{news.summary || news.aiSummary}</p>

      {/* 3. AD SLOT 1 */}
      <div style={{margin: '30px 0'}}>
        <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-3333852580300958"
          data-ad-slot="3283435154"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      {/* 4. GO TO SOURCE BUTTON - Idhe important */}
      <a
        href={news.sourceUrl}
        target="_blank"
        rel="nofollow noopener"
        style={{display: 'block', textAlign: 'center', padding: 14, background:'#00aaff', color:'white', borderRadius:8, textDecoration: 'none', fontWeight: 'bold', fontSize: 16}}>
        Read Full Article on {news.sourceName} →
      </a>

      {/* 5. AD SLOT 2 */}
      <div style={{margin: '30px 0'}}>
        <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-3333852580300958"
          data-ad-slot="5641739251"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

    </div>
  )
}
