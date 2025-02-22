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

export interface AdapterResponse {
    status: number;
    message ?: string;
    document ?: AdapterDocument;
}