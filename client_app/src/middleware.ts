import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const privatePath = ['/account/me'];
const authPath = ['/login', 'register'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get('sessionToken')?.value;
	if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
		return NextResponse.redirect(new URL('/account/me', request.url));
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/login', '/register', '/account/me'],
};
