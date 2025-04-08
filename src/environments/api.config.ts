import { environment } from "./environment";

export const apiConfig = {
    user:{
        login: environment.apiURL+'User/login',
        logout: environment.apiURL+'User/logout',
    }
}