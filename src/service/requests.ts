import UserFront from "../models/UserFront"
import UserData from "../models/UserData"
import UserUpdate from "../models/UserUpdate"
import UserCreate from "../models/UserCreate"
import NewPassword from "../models/NewPassword"
import Email from "../models/Email"

// Login
export const userFetch = async(userFront: UserFront)=>{
    try{
        //Configuración de la solicitud
        const response = await fetch("http://localhost:8080/auth/login",{ 
              method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userFront)
        })
        if(response.ok){
            return await response.json()
        }else{
            throw new Error(`Error response fetch: ${response.status}`);
        }
    }catch(e){
        throw new Error(`Fetch failed: ${e}`);
    }
}
//ChangeCode
export async function modifyPassword(body: NewPassword){
    try{
        const response = await fetch("http://localhost:8080/auth/reset",{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        throw new Error("No se pudo modifcar la contraseña");  
        
    }catch(e){
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }     
}
//PasswordRecovery
export async function passRecovery(body: Email ){
    try{
        const response = await fetch("http://localhost:8080/auth/forgot",{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        throw new Error("No se pudo modifcar la contraseña");  
        
    }catch(e){
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }     
}
// User Management
export async function getUsers(token :string):Promise<UserData[]>{
    try{
        const response = await fetch("http://localhost:8080/users",{  
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        if(response.ok){
            const data: UserData[] = await response.json();
            return data;
        }
        throw new Error("No se pudo obtener los usuarios");  
    }catch(e){  
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }
}
export async function updateUser(token: string, id_user: number, body: UserUpdate){
    try{
        const response = await fetch(`http://localhost:8080/users/update?id=${id_user}`,{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        throw new Error("No se pudo actualizar los datos el usuario");  
        
    }catch(e){
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }     
}
export async function addUser(token: string, body: UserCreate){
    try{
        const response = await fetch(`http://localhost:8080/users/register`,{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        throw new Error("No se pudo agregar el usuario");  
        
    }catch(e){
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }     
}
export async function stateUser(token: string, id_user: number, body: string){
    try{
        const response = await fetch(`http://localhost:8080/users/toggle-activation?id=${id_user}&status=${body}`,{  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        throw new Error("No se pudo modificar el estado del usuario");  
        
    }catch(e){
        if (e instanceof Error) {
            throw new Error(e.message);
          }
          throw new Error('Error desconocido'); 
    }     
}
