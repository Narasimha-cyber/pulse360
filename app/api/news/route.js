export async function GET() {
  const API_KEY = "a15e136ed5754b11916b66a9b404b40f";
  const categories = ['sports', 'technology', 'business'];
  let allNews = [];
  
  for(let cat of categories) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?category=${cat}&country=in&pageSize=10&apiKey=${API_KEY}`);
    const data = await res.json();
    if(data.articles) {
      allNews.push(...data.articles.map(a => ({...a, category: cat})));
    }
  }
  
  return Response.json(allNews);
}
