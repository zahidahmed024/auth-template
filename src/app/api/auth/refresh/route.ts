export async function POST(request: Request) {
  try {
    const refreshToken = await request.headers.get("authorization");
    console.log("refreshToken", refreshToken);
    const refreshRequest = await fetch("http://localhost:3001/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${refreshToken?.split(" ")[1]}`,
      },
    });
    // console.log("refreshRequest", refreshRequest.json());
    if (!refreshRequest.ok) {
      throw new Error("Failed to refresh");
    }
    const result = await refreshRequest.json();
    console.log("result", result);

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `accessToken=${result.accessToken}; Path=/; SameSite=Strict;`
    );
    headers.append(
      "Set-Cookie",
      `refreshToken=${result.refreshToken};  Path=/; SameSite=Strict;`
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: headers,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
}
