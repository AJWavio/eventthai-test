import * as bcrypt from 'bcrypt';

export async function getPasswordHash(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function comparePasswordHash(
    password: string,
    hash: string,
): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
