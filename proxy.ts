import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const h = request.headers;
  const entry = {
    time: new Date().toISOString(),
    method: request.method,
    path: request.nextUrl.pathname + request.nextUrl.search,
    ip: h.get('x-forwarded-for')?.split(',')[0].trim() ?? '',
    country: h.get('x-vercel-ip-country') ?? '',
    city: h.get('x-vercel-ip-city') ?? '',
    ua: h.get('user-agent') ?? '',
    referer: h.get('referer') ?? '',
  };

  // Vercel dashboard > Logs icin (Hobby planda ~1 saat tutulur)
  console.log('visitor', JSON.stringify(entry));

  // Kalıcı kayıt: Supabase env'leri tanımlıysa arka planda yaz
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    event.waitUntil(
      fetch(`${url}/rest/v1/visitor_logs`, {
        method: 'POST',
        headers: {
          apikey: key,
          authorization: `Bearer ${key}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
        // ponytail: log yazılamazsa ziyaretçiyi asla etkileme
      }).catch(() => {})
    );
  }

  return NextResponse.next();
}

export const proxyConfig = {
  // _next asset'leri ve Vercel Analytics hariç her şeyi logla —
  // /wp-admin, /.env gibi kurcalama denemeleri de düşsün diye geniş tutuldu
  // /logs hariç: kendi dashboard ziyaretlerin tabloyu doldurmasın
  matcher: ['/((?!_next/static|_next/image|_vercel|favicon.ico|logs).*)'],
};
