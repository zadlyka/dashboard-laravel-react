export interface Option {
    value: string;
    label: string;
}

export interface User {
    id: string;
    role_id: string;
    name: string;
    email: string;
    email_verified_at: string;
    role?: Role;
}
export interface Role {
    id: string;
    name: string;
    permissions: Option[];
}

export interface Category {
    id: string;
    name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
