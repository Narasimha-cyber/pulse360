export async function GET(request) {
  const API_KEY = process.env.GNEWS_API_KEY; // 👈 idi important

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'top';

  let query = '';
  if(type === 'andhra') query = 'Andhra Pradesh';
  if(type === 'sports') query = 'sports';
  if(type === 'national') query = 'India';

  const searchQuery = query? `&q=${query}` : '';

  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=15${searchQuery}&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}
