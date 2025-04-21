import { Injectable } from "@angular/core";
import { EncryptionDecryptionService } from "./encrypt-decrypt.service";
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor(private encryptionDescriptionService: EncryptionDecryptionService) {
    }
    setItem(key: string, data: any): void {
        try {
            const encryptedData = this.encryptionDescriptionService.encryptInfo(data, 1716836087);
            localStorage.setItem(key, encryptedData);
        }
        catch {
            this.clearLocalStorage();
        }
    }
    getItem(key: string): any {
        try {
            const encryptedData = localStorage.getItem(key);
            if (encryptedData) {
                const decryptedData = this.encryptionDescriptionService.decryptInfo(encryptedData, 1716836087) ;
                if(decryptedData)
                {
                    return decryptedData;
                }
            }
            this.clearLocalStorage();
            return null;
        }
        catch {
            this.clearLocalStorage();
            return null;
        }
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    clearLocalStorage() {
        localStorage.clear();
    }
}