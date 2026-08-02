export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.GNEWS_API_KEY;
  const queries = ['india', 'technology', 'business', 'cricket']; // mix cheddam
  let allNews = [];
  
  for(let q of queries) {
    try {
      const res = await fetch(`https://gnews.io/api/v4/search?q=${q}&lang=en&country=in&max=8&apikey=${API_KEY}`, {cache: 'no-store'});
      const data = await res.json();
      
      if(data.articles && data.articles.length > 0) {
        allNews.push(...data.articles.map(a => ({
          title: a.title,
          description: a.description,
          urlToImage: a.image,
          url: a.url,
          publishedAt: a.publishedAt,
          source: { name: a.source.name },
          category: q // category ga query name pedadam
        })));
      }
    } catch(e) {
      console.log("Error:", e)
    }
  }
  
  // duplicate news remove cheddam
  const uniqueNews = allNews.filter((v,i,a)=>a.findIndex(t=>(t.url === v.url))===i)
  
  return Response.json(uniqueNews.slice(0, 24)); // max 24 news
}
