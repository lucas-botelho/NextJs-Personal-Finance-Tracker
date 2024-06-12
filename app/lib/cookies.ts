import { cookies } from "next/headers";

export function getUserCookie() {
    return cookies().get('user')?.value ?? '';
}