const API_BASE = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE}/api/auth/verify-reset-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => ({}));

    return Response.json(payload, { status: response.status });
  } catch (error) {
    return Response.json(
      {
        error: "Unable to reach verification service",
      },
      { status: 500 }
    );
  }
}
