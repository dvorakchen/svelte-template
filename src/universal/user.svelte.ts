import { goto } from "$app/navigation";
import { FetchResultStatus, type FetchResult } from "@/lib/share";
import type { PartOfUser } from "@/lib/share/user";
import { http } from "@/net/http";

const CACHE_KEY = 'CURRENT_USER';

class UserMan {
    private _username = $state('');
    public isLoggedIn = $derived(this._username.trim() !== '');

    public get username(): string {
        return this._username;
    }

    /**
     * user login
     * @param phoneNumber login phone number
     * @param captcha captcha
     * @returns returns null if login success, or returns error message
     */
    public async login(phoneNumber: string, captcha: string): Promise<string | null> {
        const response = await http.post<FetchResult<PartOfUser>>('login', {
            phoneNumber,
            captcha
        });

        if (response.data.status === FetchResultStatus.success) {
            const partOfUser = response.data.data!;
            this._username = partOfUser.username ?? '';
            this.storeCache(partOfUser);
            return null;
        } else {
            return response.data.error;
        }
    }

    /**
     * ensure user is logged in
     * @returns true if user is logged in, false otherwise
     */
    public async ensureLogin(): Promise<boolean> {
        if (!this.isLoggedIn) {
            goto('/?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
            return false
        };

        const response = await http.head<PartOfUser>('login/check');
        console.log(response.data);

        return true;
    }

    /**
     * user logout and goto home page
     */
    public logout() {
        this._username = '';
        this.clearCache();
        goto('/');
    }

    public refresh() {
        this._username = this.retrieveCache()?.username ?? '';;
    }

    private storeCache(user: PartOfUser) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(user));
    }

    private retrieveCache(): PartOfUser | null {
        const cache = localStorage.getItem(CACHE_KEY);
        if (cache === null) {
            return null;
        }

        const data: PartOfUser = JSON.parse(cache);
        return data;
    }

    private clearCache() {
        localStorage.removeItem(CACHE_KEY);
    }
}

export const userMan = new UserMan();