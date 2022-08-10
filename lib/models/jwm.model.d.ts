export interface CommonPayloadJWM {
    body: any;
    created_time?: string;
    expires_time?: string;
    from?: string;
    id: string;
    to?: string[];
    type: string;
}
export interface StandardPayloadJWM extends CommonPayloadJWM {
    reply_to?: string;
    reply_url?: string;
    thread_id?: string;
}
