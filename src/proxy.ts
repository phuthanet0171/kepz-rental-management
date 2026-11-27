import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

const PUBLIC_PATHS = ["/login", "/signup", "/start", "/setup", "/welcome"];
/** หน้าที่ทำงานได้โดยไม่ต้องมีฐานข้อมูล (ข้อมูลเก็บในเครื่องผู้ใช้ชั่วคราว) */
const PROTOTYPE_PATHS = ["/welcome", "/signup", "/start"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!isSupabaseConfigured) {
    // ยังไม่ได้ต่อฐานข้อมูล: หน้าตัวอย่างที่ไม่ใช้ฐานข้อมูลยังเปิดได้ (ทดสอบหน้าตาบน Vercel ได้ก่อน)
    // หน้าอื่นที่ต้องใช้ข้อมูลจริงพาไปหน้าแนะนำการตั้งค่า
    if (pathname === "/") return NextResponse.redirect(new URL("/welcome", request.url));
    if (PROTOTYPE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return NextResponse.next();
    if (pathname === "/setup") return NextResponse.next();
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // ต้องเรียก getClaims ทุกครั้งเพื่อต่ออายุ session ก่อน render
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);

  if (!signedIn && !isPublic) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
    }
    // ยังไม่ได้เข้าสู่ระบบแล้วเปิดหน้าแรก → หน้าแนะนำ Kepz (ชวนมาใช้งาน)
    if (pathname === "/") return NextResponse.redirect(new URL("/welcome", request.url));
    const url = new URL("/login", request.url);
    if (pathname !== "/") url.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  if (signedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|pwa-icon/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
