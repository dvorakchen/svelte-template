
import { Duration } from 'luxon';
import { FetchResult } from '$lib/share';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from "@sveltejs/kit";
import type { PartOfUser } from '@/lib/share/user';
import { COOKIE_JWT_NAME } from '.';
import { loginOrRegisterUser } from '@/lib/server/user';
import { checkCaptcha } from '@/lib/server/captcha';
import { signJWT } from '@/lib/server/jwt';

export async function POST({ request, cookies }: RequestEvent) {
    let user: PartOfUser;
    if (import.meta.env.DEV) {
        user = {
            id: 125,
            username: '写作大师9527',
            phone_number: '13012011000'
        } as PartOfUser;
    } else {

        const { phoneNumber, captcha }: { phoneNumber: string, captcha: string } = await request.json();

        if (phoneNumber === '' || captcha === '') {
            return json(FetchResult.fail('需填写手机号和验证码'))
        }

        if (!await checkCaptcha(phoneNumber, captcha)) {
            return json(FetchResult.fail('验证码错误或过期，请重试'))
        }

        user = await loginOrRegisterUser(phoneNumber);
    }

    const token = signJWT(user);

    cookies.set(COOKIE_JWT_NAME, token, {
        path: '/', sameSite: 'strict', httpOnly: true,
        secure: import.meta.env.PROD,
        maxAge: Duration.fromObject({ weeks: 1 }).as('seconds')
    });

    return json(FetchResult.success(user));
}

