export async function GET() {
  const res = await fetch(
    `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`,
    { 
      cache: 'no-store', // <- idhi chala imp bro. Cache off cheyyadaniki
      next: { revalidate: 0 } // Next.js 13+ kosam
    }
  );

  if (!res.ok) {
    return Response.json({ error: "GNews failed" }, { status: 500 });
  }

  const data = await res.json();
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'no-store, max-age=0', // Browser cache kuda off
    },
  });
}
