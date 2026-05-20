import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If env vars are missing, let the page render (it will show its own error)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user && pathname !== '/crm/login') {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }

    if (user && pathname === '/crm/login') {
      return NextResponse.redirect(new URL('/crm/leads', request.url))
    }
  } catch {
    // On auth error, redirect to login rather than crashing
    if (pathname !== '/crm/login') {
      return NextResponse.redirect(new URL('/crm/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/crm/:path*'],
}
