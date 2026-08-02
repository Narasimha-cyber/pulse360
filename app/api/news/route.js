export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.GNEWS_API_KEY;
  
  // India categories - 4 types mix
  const searches = [
    {q: 'india', category: 'General'},
    {q: 'india politics', category: 'Politics'},
    {q: 'india cricket', category: 'Sports'},
    {q: 'india technology', category: 'Technology'},
    {q: 'india business', category: 'Business'}
  ];
  
  let allNews = [];
  
  for(let s of searches) {
    try {
      const res = await fetch(`https://gnews.io/api/v4/search?q=${s.q}&lang=en&country=in&max=8&apikey=${API_KEY}`, {cache: 'no-store'});
      const data = await res.json();
      
      if(data.articles && data.articles.length > 0) {
        allNews.push(...data.articles.map(a => ({
          title: a.title,
          description: a.description,
          urlToImage: a.image,
          url: a.url,
          publishedAt: a.publishedAt,
          source: { name: a.source.name },
          category: s.category
        })));
      }
    } catch(e) {
      console.log("Error:", e)
    }
  }
  
  // duplicate remove
  const uniqueNews = allNews.filter((v,i,a)=>a.findIndex(t=>(t.url === v.url))===i)
  
  return Response.json(uniqueNews.slice(0, 32)); // 32 news max
}
