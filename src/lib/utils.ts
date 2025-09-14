
export function getByCurrentQueryString(name: string): string | null {
    return getByUrlQueryString(location.href, name);
}

export function getByUrlQueryString(url: string, name: string): string | null {
    const params = new URL(url).searchParams;
    const value = params.get(name);

    return value;
}