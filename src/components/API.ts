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

    async getUserInfo(): Promise<UserDataApi> {
        return await this.request<UserDataApi>("/users/me");
    }

    async getInitialCards(): Promise<CardDataApi[]> {
        return await this.request<CardDataApi[]>("/cards/");
    }

    async editUserInfo(data: UserFormData): Promise<UserDataApi> {
        return await this.request<UserDataApi>("/users/me", { method: "PATCH", body: JSON.stringify(data) });
    }

    async addCard(data: CardFormData): Promise<CardDataApi> {
        return await this.request<CardDataApi>("/cards/", { method: "POST", body: JSON.stringify(data) });
    }

    async deleteCard(cardId: string): Promise<void> {
        await this.request<void>(`/cards/${cardId}`, { method: "DELETE" });
    }

    async changeLikeCardStatus(cardId: string, isLiked: boolean): Promise<CardDataApi> {
        return await this.request<CardDataApi>(`/cards/${cardId}/likes`, { method: isLiked ? "PUT" : "DELETE" });
    }

    async updateAvatar(data: { avatar: string }): Promise<UserDataApi> {
        return await this.request<UserDataApi>("/users/me/avatar", { method: "PATCH", body: JSON.stringify(data) });
    }
}
