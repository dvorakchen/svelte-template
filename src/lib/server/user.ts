import { sql } from "bun";
import type { PartOfUser } from "../share/user";
import { permissions, themePrefer, userStatus } from '$lib/share';

/**
 * Check if user is exist and enabled
 */
export async function checkUserValid(user: PartOfUser): Promise<string | null> {

    const values = await sql` SELECT id FROM users 
    WHERE id = ${user.id} AND username = ${user.username} and phone_number = ${user.phone_number} and status = ${userStatus.enabled}
    LIMIT 1 `.values();

    if (values.length === 0) {
        return '用户不存在或已被禁用';
    }

    return null;
}


export async function loginOrRegisterUser(phoneNumber: string): Promise<PartOfUser> {

    const users: PartOfUser[] = await sql`
SELECT u.* FROM public.users AS u
WHERE phone_number = ${phoneNumber} and status = ${userStatus.enabled}
`.values();

    let user: PartOfUser;
    if (users.length <= 0) {
        // register user
        user = await registerUser(phoneNumber);
    } else {
        user = users[0];
    }

    return user;
}


export async function registerUser(phoneNumber: string): Promise<PartOfUser> {
    const initUsername = `用户${phoneNumber.slice(-4)}`;

    const attributes = {
        "theme": themePrefer.light, "language": "zh", "permissions": [permissions.baseAccess]
    };

    const [user] = await sql`INSERT INTO users (username, email, password_hash, phone_number, balance, status, attributes) VALUES
    (${initUsername}, '', '', ${phoneNumber}, 0, ${userStatus.enabled}, ${JSON.stringify(attributes)})
    RETURNING *;`

    await sql`
    INSERT INTO user_roles (user_id, role_id)
    SELECT u.id, r.id 
    FROM users u, roles r 
    WHERE u.phone_number = ${phoneNumber} AND r.name = 'user'
    ON CONFLICT (user_id, role_id) DO NOTHING;`;

    return user;
}
