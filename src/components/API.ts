import type { CardDataApi, CardFormData } from "./Card.js";

interface ApiOptions {
    baseUrl: string;
    headers: HeadersInit;
}

export interface UserDataApi {
    name: string;
    about: string;
    avatar: string;
    _id: string;
}

export interface UserFormData {
    name: string;
    about: string;
}

export class Api {
    private baseUrl: string;
    private headers: HeadersInit;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl.replace(/\/$/, "");
        this.headers = options.headers;
    }

    private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            headers: { ...this.headers, ...options.headers },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }

    getUserInfo(): Promise<UserDataApi> {
        return this.request<UserDataApi>("/users/me");
    }

    getInitialCards(): Promise<CardDataApi[]> {
        return this.request<CardDataApi[]>("/cards/");
    }

    editUserInfo(data: UserFormData): Promise<UserDataApi> {
        return this.request<UserDataApi>("/users/me", { method: "PATCH", body: JSON.stringify(data) });
    }

    addCard(data: CardFormData): Promise<CardDataApi> {
        return this.request<CardDataApi>("/cards/", { method: "POST", body: JSON.stringify(data) });
    }

    deleteCard(cardId: string): Promise<void> {
        return this.request<void>(`/cards/${cardId}`, { method: "DELETE" });
    }

    changeLikeCardStatus(cardId: string, isLiked: boolean): Promise<CardDataApi> {
        return this.request<CardDataApi>(`/cards/${cardId}/likes`, { method: isLiked ? "PUT" : "DELETE" });
    }

    updateAvatar(data: { avatar: string }): Promise<UserDataApi> {
        return this.request<UserDataApi>("/users/me/avatar", { method: "PATCH", body: JSON.stringify(data) });
    }
}
