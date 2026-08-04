export async function GET() {
  // today date teeskovadam
  const today = new Date().toISOString().split('T')[0]; // 2026-08-04

  const res = await fetch(
    `https://gnews.io/api/v4/search?q=India&lang=en&country=in&max=10&from=${today}&apikey=${process.env.GNEWS_API_KEY}`,
    {
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
