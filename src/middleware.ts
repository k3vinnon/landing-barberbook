import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ⚠️ IMPORTANTE: Forçar Node.js runtime em vez de Edge
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
  runtime: 'nodejs'
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Verificação simples baseada em cookies do Supabase
  const hasSession = request.cookies.has('sb-access-token') || 
                     request.cookies.has('sb-refresh-token')
  
  // Proteger rotas do dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Redirecionar de /login para /dashboard se já estiver logado
  if (request.nextUrl.pathname === '/login' && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return response
}
