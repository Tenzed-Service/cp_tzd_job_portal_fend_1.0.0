import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import { SecurityKeyService } from "./security-key.service";
@Injectable({ providedIn: 'root' })
export class EncryptionDecryptionService {
    constructor(
        private securityKeyService: SecurityKeyService
    ) {
    }
    encryptInfo(unEncryptedInfo: string, seed: number = -1): string | undefined {
        try {
            let keyText = this.securityKeyService.generateEncryptionKey(seed, 32);
            let ivText = this.securityKeyService.generateEncryptionKey(seed, 16);
            let key = CryptoJS.enc.Utf8.parse(keyText); // Use a 16, 24, or 32-byte key
            let iv = CryptoJS.enc.Utf8.parse(ivText);  // Use a 16-byte IV
            const encryptedInfo = CryptoJS.AES.encrypt(unEncryptedInfo, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC
            }).toString();
            return encryptedInfo;
        }
        catch (err) {
            console.log(err);
        }
    }
    decryptInfo(encryptedInfo: string, seed: number = -1): string | undefined {
        try {
            let keyText = this.securityKeyService.generateEncryptionKey(seed, 32);
            let ivText = this.securityKeyService.generateEncryptionKey(seed, 16);
            let key = CryptoJS.enc.Utf8.parse(keyText); // Use a 16, 24, or 32-byte key
            let iv = CryptoJS.enc.Utf8.parse(ivText);  // Use a 16-byte IV
            const decryptedInfo = CryptoJS.AES.decrypt(encryptedInfo, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC
            }).toString(CryptoJS.enc.Utf8);
            return decryptedInfo;
        } catch (err) {
            console.log(err);
        }
    }
}