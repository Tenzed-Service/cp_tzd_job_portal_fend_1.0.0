import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class SecurityKeyService {
    constructor() 
    { 
    }
    generateEncryptionKey(seed:number, length = 16) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        // Simple PRNG using a fixed seed (Linear Congruential Generator)
        function seededRandom(seed:number) {
            const a = 1664525;
            const c = 1013904223;
            const m = Math.pow(2, 32);
            let state = seed;
            return function() {
                state = (a * state + c) % m;
                return state / m;
            };
        }
        const random = seededRandom(seed);
        // Complex logic with loops and conditions
        for (let i = 0; i < length; i++) {
            let rand = random();
            let charIndex = Math.floor(rand * characters.length);
            // Adding some conditions for complexity
            if (i % 2 === 0) {
                charIndex = (charIndex + i) % characters.length;
            } else {
                charIndex = (charIndex - i + characters.length) % characters.length;
            }
            result += characters.charAt(charIndex);
        }
        return result;
    }
}