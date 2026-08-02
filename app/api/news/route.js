export const dynamic = 'force-dynamic'; // cache off

export async function GET() {
  const API_KEY = "918b260d09e849499aa4aca07a24205e";
  const categories = ['sports', 'technology', 'business'];
  let allNews = [];
  
  for(let cat of categories) {
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?category=${cat}&country=in&pageSize=10&apiKey=${API_KEY}`, {
        cache: 'no-store'
      });
      const data = await res.json();
      console.log(data); // debug kosam
      if(data.status === "ok" && data.articles) {
        allNews.push(...data.articles.map(a => ({...a, category: cat})));
      } else {
        console.log("API Error:", data.message)
      }
    } catch(e) {
      console.log("Fetch Error:", e);
    }
  }
  
  return Response.json(allNews);
}
