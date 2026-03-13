import { verifyApiKey } from "@/lib/auth/verify-api-key";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/* create a single Lead */
export async function POST(req: Request) {
  const supabase = createAdminClient();

  const body = await req.json();
  const { name, phone, city, source } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name,
      phone,
      city,
      source,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

/* get all leads */
export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
