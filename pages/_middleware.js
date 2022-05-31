import { NextResponse } from "next/server";

export default function middleware(req) {
  const { token } = req.cookies;
  const { pathname, origin } = req.nextUrl;
  if (
    !token &&
    pathname != `/login` &&
    pathname != `/register/worker` &&
    pathname != `/register/company` &&
    pathname != `/`
    // pathname != `/profile/edit`
  ) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
