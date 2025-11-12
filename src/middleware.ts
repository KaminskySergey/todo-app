
// const PUBLIC_PATHS = ["/", "/auth/signin", "/auth/signup"];

export async function middleware() {
  // const path = req.nextUrl.pathname;

  // if (PUBLIC_PATHS.includes(path)) return NextResponse.next();

  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/changeEmail"],
};
