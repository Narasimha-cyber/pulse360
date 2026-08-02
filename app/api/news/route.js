export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY;
  const categories = ['sports', 'technology', 'business'];
  let allNews = [];
  
  for(let cat of categories) {
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?category=${cat}&country=in&pageSize=10&apiKey=${API_KEY}`, {cache: 'no-store'});
      const data = await res.json();
      if(data.status === "ok" && data.articles) {
        allNews.push(...data.articles.map(a => ({...a, category: cat})));
      }
    } catch(e) {}
  }
  return Response.json(allNews);
}
