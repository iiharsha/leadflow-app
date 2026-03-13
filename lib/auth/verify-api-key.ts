import { NextResponse } from "next/server";

export function verifyApiKey(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  const serverKey = process.env.API_SECRET_KEY;

  if (!apiKey || apiKey !== serverKey) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
