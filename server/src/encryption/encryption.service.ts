import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
    private readonly iv = Buffer.from(process.env.ENCRYPTION_IV || '', 'hex');

    encrypt(text: string): string {
        try {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        } catch (error) {
            console.error('Error al encriptar el texto:', error);
            throw new Error('Error al encriptar el texto');
        }
    }

    decrypt(encrypted: string): string {
        try {
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.error('Error al desencriptar el texto:', error);
            throw new Error('Error al desencriptar el texto');
        }
    }
} 