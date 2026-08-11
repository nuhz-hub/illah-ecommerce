import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/login?error=confirmation_failed", request.url),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Email confirmation error:", error.message);

    return NextResponse.redirect(
      new URL("/auth/login?error=confirmation_failed", request.url),
    );
  }

  return NextResponse.redirect(
    new URL("/auth/login?confirmed=true", request.url),
  );
}

 