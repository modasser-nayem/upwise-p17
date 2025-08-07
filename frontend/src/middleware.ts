import { NextResponse, NextRequest } from "next/server";
import { decodeToken } from "./lib/decodeToken";

const protectedRoutes = [
   "/student",
   "/admin",
   "/instructor",
   "/dashboard",
   "/watch",
];

export function middleware(req: NextRequest) {
   const pathName = req.nextUrl.pathname;
   const token = req.cookies.get("accessToken")?.value;

   // If route is protected and no token
   if (protectedRoutes.some((route) => pathName.startsWith(route)) && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
   }

   // If token exists, validate it
   if (token) {
      const decoded = decodeToken(token);
      if (!decoded) {
         return NextResponse.redirect(new URL("/login", req.url));
      }

      const { role } = decoded;

      if (pathName.startsWith("/student") && role !== "student") {
         return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      if (pathName.startsWith("/admin") && role !== "admin") {
         return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      if (pathName.startsWith("/instructor") && role !== "instructor") {
         return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/student/:path*",
      "/admin/:path*",
      "/instructor/:path*",
      "/dashboard/:path*",
      "/watch/:path*",
   ],
};
