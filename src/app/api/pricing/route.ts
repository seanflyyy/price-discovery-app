import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const apiKey = process.env.AGENTQL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { website } = await request.json();

    const response = await axios.post(
      'https://api.agentql.com/v1/query-data',
      {
        query: '{ products[] { product_name product_price(integer) } }',
        url: website,
        params: {
          wait_for: 2,
          is_scroll_to_bottom_enabled: false,
          mode: 'fast',
          is_screenshot_enabled: false
        }
      },
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error collecting price data:', error);
    return NextResponse.json(
      { error: 'Failed to collect price data' },
      { status: 500 }
    );
  }
}