import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Referer: "",
        "User-Agent": "Mozilla/5.0",
      },
    });

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return new Response("Image fetch failed", { status: 500 });
  }
}
