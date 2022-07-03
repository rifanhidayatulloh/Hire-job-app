import { NextResponse } from 'next/server';

export default function middleware(req) {
  const { token } = req.cookies;
  const { pathname, origin } = req.nextUrl;
  if (
    !token &&
    pathname != `/login` &&
    pathname != `/register/worker` &&
    pathname != `/register/company` &&
    pathname != `/` &&
    pathname != `/peworldIcon.png` &&
    pathname != `/b9de1e2e658498c339524384fbdc112d.jpg` &&
    pathname != `/landing2.jpg` &&
    pathname != `/checklist.png` &&
    pathname != `/checkyellow.png` &&
    pathname != `/landing3.jpg` &&
    pathname != `/profile-default.png` &&
    pathname != `/putihPeworld.png` &&
    pathname != `/favicon.ico` &&
    pathname != `/iconSearch.svg` &&
    pathname != `/mapIcon.svg`
  ) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
