export async function POST(request: Request) {
  try {
    const loginReqBody = await request.json();
    const loginRequest = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginReqBody),
    });
    if (!loginRequest.ok) {
      throw new Error("Failed to login");
    }
    const result = await loginRequest.json();
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
    // console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
}
