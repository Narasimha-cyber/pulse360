export async function GET(request) {
  const API_KEY = "842b7bc5d353481baa9d29ee833fe47e";

  // URL nunchi?type=andhra ani teeskuntam
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'top';

  let query = '';
  if(type === 'andhra') query = 'Andhra Pradesh OR AP';
  if(type === 'sports') query = 'sports';
  if(type === 'national') query = 'India';

  const searchQuery = query? `&q=${query}` : '';

  try {
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=20${searchQuery}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ articles: [] });
  }
}
