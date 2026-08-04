export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  
  if(type === 'andhra') url = `https://newsapi.org/v2/everything?q=Andhra Pradesh OR Telangana&language=en&sortBy=publishedAt&from=2026-08-04&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  if(type === 'sports') url = `https://newsapi.org/v2/top-headlines?category=sports&country=in&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  
  const formatted = {
    articles: data.articles?.map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      url: a.url,
      image: a.urlToImage || 'https://via.placeholder.com/400x200',
      publishedAt: a.publishedAt,
      source: { name: a.source.name }
    })) || []
  };

  return Response.json(formatted);
}
