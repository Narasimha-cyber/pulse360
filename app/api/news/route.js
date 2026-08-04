export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let url = '';

  if(type === 'andhra') {
    // Currents Search API - AP/TS keywords tho matrame search
    url = `https://api.currentsapi.services/v1/search?keywords=Andhra Pradesh OR Telangana OR AP OR TS OR Hyderabad OR Vijayawada OR Visakhapatnam&country=IN&language=en&apiKey=${process.env.CURRENTS_API_KEY}`;
  } 
  else if(type === 'sports') {
    url = `https://api.currentsapi.services/v1/latest-news?category=sports&country=IN&language=en&apiKey=${process.env.CURRENTS_API_KEY}`;
  }
  else {
    url = `https://api.currentsapi.services/v1/latest-news?category=general&country=IN&language=en&apiKey=${process.env.CURRENTS_API_KEY}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
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

  return Response.json(formatted);
}
