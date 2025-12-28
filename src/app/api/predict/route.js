export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://eom-api-238691715480.asia-southeast1.run.app/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Prediction failed" }),
      { status: 500 }
    );
  }
}
