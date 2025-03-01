import { UUID } from "crypto";

export interface DiscordAPIPutResponse {
    length: number;
}

export interface AdapterDocument {
    webhook_id: string;
    token: string;
    _id: string;
    uuid: {
        type: string;
        data: number[];
    };
}

export interface TokenDocument {
    _id: string;
    discord_id: string;
    token: string;
}

export interface RESTResponse {
    status: number;
}

export interface AdapterResponse extends RESTResponse {
    message ?: string;
    document ?: AdapterDocument;
}

export interface AuthResponse extends RESTResponse {
    message ?: string;
    document ?: TokenDocument;
}