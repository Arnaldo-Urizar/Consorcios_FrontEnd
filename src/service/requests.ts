import { UserFront,UserData,UserUpdate,UserCreate,NewPassword,Email,JWT } from "../models/generals"
import WebApiResponse from "../models/WebApiResponse"
import { handleHttpError, isNetworkError } from "../helpers/handleHttpError"

//Login
export const userFetch = async(userFront: UserFront): Promise<JWT>=>{
    try{
        const response = await fetch("http://localhost:8080/api/v1/auth/login",{ 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userFront)
        })
        const result: WebApiResponse<JWT> = await response.json();

        if (!result.success || !response.ok) {
            handleHttpError(result.statusCode, result.error)
            return result.data
        } 
        return result.data
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }
}
//ChangeCode
export async function modifyPassword(body: NewPassword): Promise<WebApiResponse<null>>{
    try{
        const response = await fetch("http://localhost:8080/api/v1/auth/reset",{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const result: WebApiResponse<null> = await response.json();

        if (!result.success && !response.ok) {
            handleHttpError(result.statusCode, result.error)
            return result; 
        }
        return result;   
        
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }     
}

//PasswordRecovery
export async function passRecovery(body: Email ):Promise<WebApiResponse<null>>{
    try{
        const response = await fetch("http://localhost:8080/api/v1/auth/forgot",{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const result: WebApiResponse<null> = await response.json();

        if (!result.success && !response.ok) {
            handleHttpError(result.statusCode, result.error)
            return result; 
        }  
        return result; 
        
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }     
}

// User Management
export async function getUsers(token :string):Promise<UserData[]>{
    try{
        const response = await fetch("http://localhost:8080/api/v1/operator",{  
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });

        const result: WebApiResponse<UserData[]> = await response.json()

        if(!result.success && !response.ok){
            handleHttpError(result.statusCode, result.error)
            return result.data;
        }
        return result.data;
    }catch(e){  
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }
}

//Update user
export async function updateUser(token: string, id_user: number, body: UserUpdate):Promise<WebApiResponse<null>>{
    try{
        const response = await fetch(`http://localhost:8080/api/v1/operator/update?idUser=${id_user}`,{  
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        const result: WebApiResponse<null> = await response.json();

        if (!response.ok || !result.success) {
            handleHttpError(result.statusCode, result.message);
            return result; 
        }
        return result;       
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }     
}

//Add user
export async function addUser(token: string, body: UserCreate):Promise<WebApiResponse<null>>{
    try{
        const response = await fetch(`http://localhost:8080/api/v1/operator/register`,{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        const result: WebApiResponse<null> = await response.json()

        if(!result.success || !response.ok){
            handleHttpError(result.statusCode, result.error)
            return result; 
        }
        return result;         
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }     
}

//Status User
export async function stateUser(token: string, id_user: number, body: string):Promise<WebApiResponse<null>>{
    try{
        const response = await fetch(`http://localhost:8080/api/v1/operator/toggle-activation?id=${id_user}&status=${body}`,{  
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        const result: WebApiResponse<null> = await response.json()

        if(!result.success || !response.ok){
            handleHttpError(result.statusCode, result.error)
            return result; 
        }
        return result;  
    }catch(e){
        if (isNetworkError(e)) {
            throw new Error("No se pudo conectar al servidor. Verifica tu conexión a Internet o intenta más tarde.");
        }
        throw (e instanceof Error) ? e : new Error("Error desconocido.");
    }     
}


