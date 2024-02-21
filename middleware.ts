import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encode } from "@/app/[M]/page";

export function middleware(req: NextRequest) {
    // get the current params from the cookies, eg theme
    // you can also get them from headers, url, route params...
    const theme = (req.cookies.get("theme")?.value || "light") as "light" | "dark";
    const company = req.cookies.get("company")?.value || "Unknown_company";
    // Here, you could run some checks, like
    // verifying that current user can actually access this company
    // and that the theme is valid
    const isValid = true;
    // convert to a megaparam
    const megaparam = encode({
        theme,
        company,
    });
    const res = NextResponse.rewrite(new URL(`/${megaparam}`, req.url));
    // remember theme if not yet done
    if (!req.cookies.has("theme")) {
        res.cookies.set("theme", theme);
    }
    if (!req.cookies.has("company")) {
        res.cookies.set("my_company", company);
    }
    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}