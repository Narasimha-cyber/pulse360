export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let query = 'India';
  if(type === 'andhra') query = 'Andhra Pradesh OR Telangana';
  if(type === 'sports') query = 'Sports India';

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`,
    { 
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  );

  if (!res.ok) {
    return Response.json({ error: "NewsAPI failed" }, { status: 500 });
  }

  const data = await res.json();
  
  // NewsAPI data ni mana page.js format ki marchadam
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

  return new Response(JSON.stringify(formatted), {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
