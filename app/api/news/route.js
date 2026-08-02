export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.GNEWS_API_KEY;
  
  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=india&lang=en&country=in&max=40&apikey=${API_KEY}`, {cache: 'no-store'});
    const data = await res.json();
    
    if(!data.articles) return Response.json([]);
    
    // Maname category guess chesi tag pedadam
    const newsWithCategory = data.articles.map(a => {
      const title = a.title.toLowerCase();
      let category = 'General';
      
      if(title.includes('cricket') || title.includes('sports') || title.includes('ipl') || title.includes('match')) category = 'Sports';
      else if(title.includes('bjp') || title.includes('congress') || title.includes('pm') || title.includes('minister') || title.includes('election')) category = 'Politics';
      else if(title.includes('tech') || title.includes('ai') || title.includes('mobile') || title.includes('apple') || title.includes('google')) category = 'Technology';
      else if(title.includes('business') || title.includes('stock') || title.includes('market') || title.includes('rupee') || title.includes('company')) category = 'Business';
      
      return {
        title: a.title,
        description: a.description,
        urlToImage: a.image,
        url: a.url,
        publishedAt: a.publishedAt,
        source: { name: a.source.name },
        category: category
      }
    });
    
    return Response.json(newsWithCategory);
    
  } catch(e) {
    return Response.json([]);
  }
}
