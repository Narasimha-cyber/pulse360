export async function GET(request) {
  const API_KEY = process.env.GNEWS_API_KEY;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'top';
  let q = 'India';
  if(type === 'andhra') q = 'Andhra Pradesh';
  if(type === 'sports') q = 'Sports';
  const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&country=in&max=15&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}
