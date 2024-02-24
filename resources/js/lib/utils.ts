import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createQueryString(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);

    return params.toString();
}
