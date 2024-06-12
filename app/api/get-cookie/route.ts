import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookie = cookies().get('user')?.value;
    if (!cookie) {
      return new Response('Cookie not found', { status: 404 });
    }
    return new Response(cookie);
  } catch (error) {
    console.error('Error fetching cookie:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
