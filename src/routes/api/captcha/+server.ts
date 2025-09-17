import { json, type RequestEvent } from '@sveltejs/kit';
import { sql } from 'bun';

export async function POST({ request }: RequestEvent) {
	const phoneNumber = await request.text();

	const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	let code = '';

	for (let i = 0; i < 4; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		code += chars[randomIndex];
	}

	await sql`DELETE FROM public.sms_captcha
WHERE phone_number = ${phoneNumber} and is_used = false`;

	await sql`
INSERT INTO public.sms_captcha
(phone_number, code, is_used)
VALUES (${phoneNumber}, ${code}, false);`;

	//

	return json('', { status: 200 });
}
