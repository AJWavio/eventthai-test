import * as crypto from 'crypto';

export function getResponseCreatedDateString(date?: string | number): string {
    if (date) return new Date(date).toISOString();

    return new Date().toISOString();
}

export function getResponseId(): string {
    return crypto.randomUUID();
}
