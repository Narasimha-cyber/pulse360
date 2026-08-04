export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let category = 'general';
  if(type === 'andhra') category = 'regional';
  if(type === 'sports') category = 'sports';

  const res = await fetch(
    `https://api.currentsapi.services/v1/latest-news?country=IN&category=${category}&language=en&apiKey=${process.env.CURRENTS_API_KEY}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return Response.json({ articles: [] }, { status: 500 });
  }

  const data = await res.json();
  
  const formatted = {
    articles: data.news?.map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      url: a.url,
      image: a.image || 'https://via.placeholder.com/400x200',
      publishedAt: a.published,
      source: { name: a.author || 'Currents' }
    })) || []
  };

  return Response.json(formatted, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}
