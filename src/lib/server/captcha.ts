import { sql } from "bun";

export async function checkCaptcha(phoneNumber: string, captcha: string): Promise<boolean> {
    const sms: {
        phone_number: string,
    }[] = await sql`
SELECT sc.* FROM public.sms_captcha AS sc
WHERE phone_number = ${phoneNumber} and  code = ${captcha} and is_used = false and expires_at > now()
limit 1`;

    if (sms.length > 0) {
        await sql`
update public.sms_captcha set is_used = true where phone_number = ${phoneNumber};`;
        return true;
    }

    return false;
}
