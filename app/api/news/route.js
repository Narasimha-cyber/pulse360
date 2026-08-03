export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const API_KEY = "918b260d09e849499aa4aca07a24205e" // nee gnews key

  let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=50&apikey=${API_KEY}`

  if(category === 'andhra'){
    url = `https://gnews.io/api/v4/search?q=andhra pradesh OR amaravati OR vijayawada OR tirupati OR visakhapatnam&lang=en&country=in&max=10&sortby=publishedAt&apikey=${API_KEY}`
  }

  try {
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    if(data.articles) {
      const articles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image, // gnews uses 'image'
        publishedAt: article.publishedAt,
        source: { name: article.source.name },
        category: category === 'andhra'? 'Andhra' : 'General'
      }))
      return Response.json(articles)
    }
    return Response.json({articles: []})
  } catch (error) {
    console.log("API Error:", error)
    return Response.json({articles: []})
  }
}
