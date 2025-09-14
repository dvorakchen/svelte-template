
/**
 * Response data of User Login 
 */
export type PartOfUser = { id: number, username: string, phone_number: string };

export const userStatus = {
    disabled: 0,
    enabled: 1,
} as const;