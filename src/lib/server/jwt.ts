import { SERVER_PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { PartOfUser } from '../share/user';


export function signJWT(user: PartOfUser): string {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        phoneNumber: user.phone_number
    }, SERVER_PRIVATE_KEY, { expiresIn: '1Week' });

    return token;
}