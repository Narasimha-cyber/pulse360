export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // iroju + ninna data kuda teeskovadam
  const today = new Date().toISOString().split('T')[0]; // 2026-08-04
  const yesterday = new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0]; // 2026-08-03

  let query = 'India';
  if(type === 'andhra') query = 'Andhra Pradesh';
  if(type === 'sports') query = 'Sports India';

  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&from=${yesterday}&apikey=${process.env.GNEWS_API_KEY}`,
    { 
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  );

  const data = await res.json();
  
  // Date prakaram sort cheyyadam - latest news paina
  data.articles?.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return new Response(JSON.stringify(data), {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
