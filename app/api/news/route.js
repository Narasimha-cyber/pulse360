export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.GNEWS_API_KEY;
  const categories = ['sports', 'technology', 'business'];
  let allNews = [];
  
  for(let cat of categories) {
    try {
      const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&country=in&max=10&apikey=${API_KEY}`, {cache: 'no-store'});
      const data = await res.json();
      
      if(data.articles && data.articles.length > 0) {
        allNews.push(...data.articles.map(a => ({
          title: a.title,
          description: a.description,
          urlToImage: a.image,
          url: a.url,
          publishedAt: a.publishedAt,
          source: { name: a.source.name },
          category: cat
        })));
      }
    } catch(e) {
      console.log("Error:", e)
    }
  }
  return Response.json(allNews);
}
