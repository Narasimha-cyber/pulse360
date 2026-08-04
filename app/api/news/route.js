// app/api/news/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get('tab') || 'in';

  const API_KEY = process.env.CURRENTS_API_KEY; // Server side nunchi teeskuntundi

  let params = `apiKey=${API_KEY}&language=en&page_size=10`;

  if(tab === 'AP') {
    params += `&keywords=Andhra Pradesh`;
  } else if(tab === 'India') {
    params += `&country=in`;
  } else {
    params += `&country=in`;
  }

  const url = `https://api.currentsapi.services/v1/search?${params}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
