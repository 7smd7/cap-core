import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define protected routes
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isOnboarding = request.nextUrl.pathname.startsWith('/onboarding')
  
  if (!user && (isDashboard || isOnboarding)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  if (user && isDashboard) {
    // If we are heading to dashboard, enforce role checking
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = userData?.role

    if (!role) {
      // User hasn't finished onboarding
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }

    // Role-based routing validation
    if (request.nextUrl.pathname.startsWith('/dashboard/nomad') && role !== 'nomad') {
       return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
    if (request.nextUrl.pathname.startsWith('/dashboard/investor') && role !== 'investor') {
       return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
    if (request.nextUrl.pathname.startsWith('/dashboard/admin') && role !== 'admin') {
       return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
  }

  if (user && request.nextUrl.pathname === '/auth') {
    // Redirect logged-in users away from auth page
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (userData?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${userData.role}`, request.url))
    } else {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  return supabaseResponse
}
