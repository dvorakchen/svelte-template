export { userStatus } from "./user";

export const permissions = {
    baseAccess: 'base_access',
    adminAccess: 'admin_access',
    premiumFeatures: 'premium_features',
    prioritySupport: 'priority_support',

} as const;

export const themePrefer = {
    light: 'light',
    dark: 'dark'
} as const;

export const FetchResultStatus = {
    success: 'success',
    fail: 'fail'
} as const;

export class FetchResult<T> {
    public status: keyof typeof FetchResultStatus = FetchResultStatus.success;
    public error: string = '';
    public data: T | undefined;

    static success<T>(data: T | null = null) {
        const res = new FetchResult();
        res.status = FetchResultStatus.success;
        res.data = data;

        return res;
    }

    static fail<T>(error: string, data: T | null = null) {
        const res = new FetchResult();
        res.status = FetchResultStatus.fail;
        res.error = error;
        res.data = data;

        return res;
    }
};