import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const role =
      searchParams.get("role") || "Frontend Developer";

    const location =
      searchParams.get("location") || "Bangalore";

    const apiKey = process.env.SERPAPI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "SERPAPI_KEY is missing",
        },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      engine: "google_jobs",
      q: role,
      location: location,
      api_key: apiKey,
      hl: "en",
      no_cache: "true",
    });

    const response = await fetch(
      `https://serpapi.com/search.json?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("SerpApi error:", data);

      return NextResponse.json(
        {
          error: "SerpApi request failed",
          details: data,
        },
        { status: response.status }
      );
    }

    if (data.error) {
      console.error("SerpApi returned error:", data.error);

      return NextResponse.json(
        {
          error: data.error,
        },
        { status: 400 }
      );
    }

    const jobs = data.jobs_results || [];

    return NextResponse.json({
      success: true,
      jobs,
      total: jobs.length,
      search: {
        role,
        location,
      },
    });
  } catch (error) {
    console.error("Jobs API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch jobs",
        details:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}