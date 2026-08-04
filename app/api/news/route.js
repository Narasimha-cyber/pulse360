export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Vercel cache break cheyyadaniki random timestamp
  const timestamp = Date.now();

  let query = 'India';
  if(type === 'andhra') query = 'Andhra Pradesh OR Telangana';
  if(type === 'sports') query = 'Sports India';

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}&t=${timestamp}`,
    {
      cache: 'no-store'
    }
  );

  const data = await res.json();
  console.log("NewsAPI Date:", data.articles?.[0]?.publishedAt); // Vercel logs lo check cheyyadaniki

  const formatted = {
    articles: data.articles?.map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      url: a.url,
      image: a.urlToImage || 'https://via.placeholder.com/400x200',
      publishedAt: new Date(a.publishedAt).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
      source: { name: a.source.name }
    })) || []
  };

  return Response.json(formatted, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}
