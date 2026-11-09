import {NextResponse} from 'next/server';
import {validateInquiry} from '@/lib/inquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(payload, status = 200) {
  return NextResponse.json(payload, {status, headers:{'Cache-Control':'no-store'}});
}

function isConfigured() {
  return process.env.INQUIRY_FORM_ENABLED === 'true' &&
    !!process.env.RESEND_API_KEY &&
    !!process.env.CONTACT_FROM_EMAIL &&
    !!process.env.TURNSTILE_SECRET_KEY;
}

async function verifyTurnstile(token) {
  if (typeof token !== 'string' || token.length < 10 || token.length > 2100) return false;

  const params = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:params,
      cache:'no-store',
      signal:controller.signal,
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request) {
  if (!isConfigured()) {
    return json({error:'Online inquiries are not available yet. Please use the contact email.'}, 503);
  }

  const origin = request.headers.get('origin');
  if (origin) {
    let isSameOrigin = false;
    try {
      isSameOrigin = new URL(origin).host === new URL(request.url).host;
    } catch { /* Invalid Origin */ }
    if (!isSameOrigin) return json({error:'This request is not allowed.'}, 403);
  }

  const size = Number(request.headers.get('content-length') || 0);
  if (size > 15000) return json({error:'Request is too large.'}, 413);

  let body;
  try { body = await request.json(); } catch { return json({error:'Invalid JSON.'}, 400); }
  if (JSON.stringify(body).length > 15000) return json({error:'Request is too large.'}, 413);

  const result = validateInquiry(body);
  if (result.spam) return json({ok:true}); // Honeypot: do not email.
  if (result.error) return json({error:result.error}, 400);

  if (!(await verifyTurnstile(body.turnstileToken))) {
    return json({error:'Security verification failed. Please refresh and try again.'}, 400);
  }

  const {name, company, email, country, product, message} = result.fields;
  const text = [
    'New NIMO business inquiry',
    '',
    'Name: ' + name,
    'Company: ' + company,
    'Business email: ' + email,
    'Country / market: ' + country,
    'Product of interest: ' + (product || 'General inquiry'),
    '',
    'Requirements:',
    message,
  ].join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        from:process.env.CONTACT_FROM_EMAIL,
        to:[process.env.CONTACT_TO_EMAIL || 'maakfood22@gmail.com'],
        reply_to:email,
        subject:'NIMO Business Inquiry — ' + company,
        text,
      }),
      cache:'no-store',
      signal:controller.signal,
    });
    if (!response.ok) {
      console.error('NIMO inquiry provider failure, status:', response.status);
      return json({error:'We could not send your inquiry. Please email our team directly.'}, 502);
    }
    return json({ok:true});
  } catch {
    console.error('NIMO inquiry provider unavailable');
    return json({error:'We could not send your inquiry. Please email our team directly.'}, 502);
  } finally {
    clearTimeout(timer);
  }
}
