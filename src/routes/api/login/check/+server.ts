import { json, type RequestEvent } from "@sveltejs/kit";
import { COOKIE_JWT_NAME } from "../";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { SERVER_PRIVATE_KEY } from "$env/static/private";
import { DateTime, Duration } from 'luxon';
import type { PartOfUser } from "@/lib/share/user";
import { checkUserValid } from "@/lib/server/user";
import { signJWT } from "@/lib/server/jwt";


/**
 * Check if user is logged in, resign JWT if valid
 * @returns 
 */
export async function HEAD({ cookies }: RequestEvent) {
    const jwtData = cookies.get(COOKIE_JWT_NAME);

    if (!jwtData) {
        return new Response(null, { status: 401 });
    }

    try {
        const decoded = jwt.verify(jwtData, SERVER_PRIVATE_KEY) as JwtPayload & PartOfUser;
        console.log(decoded);

        const exp = DateTime.fromSeconds(decoded.exp ?? 0);
        if (exp < DateTime.now()) {
            return new Response(null, { status: 401 });
        }

        if (await checkUserValid(decoded)) {
            const token = signJWT(decoded);

            cookies.set(COOKIE_JWT_NAME, token, {
                path: '/', sameSite: 'strict', httpOnly: true,
                secure: import.meta.env.PROD,
                maxAge: Duration.fromObject({ weeks: 1 }).as('seconds')
            });
        } else {
            return new Response(null, { status: 401 });
        }

        return json(decoded, { status: 200 });
    } catch (e) {
        console.error(`JWT verify error: ${e}`);
        return new Response(null, { status: 401 });
    }
}