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
    id: string;
    accessToken: string;
}

export interface GameDocument {
    
}

export interface RESTResponse {
    status: number;
}

export interface AdapterResponse extends RESTResponse {
    message ?: string;
    document ?: AdapterDocument;
}

export interface SQLiteResponse extends RESTResponse {
    message ?: string;
    document ?: TokenDocument;
    updatedEntries ?: number;
    deletedEntries ?: number;
}

export interface ITADResponse extends RESTResponse {
    message ?: string;
    content: Object;
}