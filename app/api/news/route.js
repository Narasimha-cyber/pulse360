export async function GET(request) {
  const API_KEY = process.env.GNEWS_API_KEY;

  if(!API_KEY){
    return Response.json({articles: [], error: "API Key Missing in Vercel"})
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'top';
  let q = 'India';
  if(type === 'andhra') q = 'Andhra Pradesh';
  if(type === 'sports') q = 'Sports';

  const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&country=in&max=15&apikey=${API_KEY}`;

  try{
    const res = await fetch(url);
    const data = await res.json();
    if(data.errors) return Response.json({articles: [], error: data.errors[0]})
    return Response.json(data);
  } catch(e){
    return Response.json({articles: [], error: e.message})
  }
}
