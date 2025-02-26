import {NextResponse} from "next/server";
import axios from "axios";

export const maxDuration = 60;
export async function POST(request: Request) {
  const apiKey = process.env.AGENTQL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "API key not configured",
        status: "error",
        timestamp: new Date().toISOString(),
      },
      {status: 500}
    );
  }

  try {
    const {url} = await request.json();

    const response = await axios.post(
      "https://api.agentql.com/v1/query-data",
      {
        query: "{ products[] { product_name product_price(integer) } }",
        url,
        params: {
          mode: "fast",
        },
      },
      {
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      data: response.data,
      status: "success",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch data",
        status: "error",
        timestamp: new Date().toISOString(),
      },
      {status: 500}
    );
  }
}
