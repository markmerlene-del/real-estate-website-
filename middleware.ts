import { NextResponse, type NextRequest } from 'next/server'

// Deprecated in Next.js 16 — auth logic lives in proxy.ts
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
