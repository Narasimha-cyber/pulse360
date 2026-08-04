export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let category = 'general';
  let query = '';

  if(type === 'andhra') {
    category = 'regional';
    query = '&keywords=Andhra Pradesh,AP,Telangana,TS,Hyderabad,Vijayawada,Visakhapatnam'; // AP/TS keywords force
  }
  if(type === 'sports') category = 'sports';

  const res = await fetch(
    `https://api.currentsapi.services/v1/latest-news?country=IN&category=${category}${query}&language=en&apiKey=${process.env.CURRENTS_API_KEY}`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  
  // Extra filter: title lo AP/TS lekapothe vadiley
  let articles = data.news || [];
  if(type === 'andhra') {
    articles = articles.filter(a => 
      /Andhra|AP|Telangana|TS|Hyderabad|Vizag|Vijayawada|Tirupati/i.test(a.title + ' ' + a.description)
    );
  }

  const formatted = {
    articles: articles.map(a => ({
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
