import { NextResponse } from "next/server";

export default function middleware(req) {
  const { token } = req.cookies;
  const { pathname, origin } = req.nextUrl;
  if (!token && pathname != `/login` && pathname != `/register/worker`) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
