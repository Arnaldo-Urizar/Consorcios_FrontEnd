import UserFront from "../models/UserFront"
import UserData from "../models/UserData"
import UserUpdate from "../models/UserUpdate"
import UserCreate from "../models/UserCreate"
import NewPassword from "../models/NewPassword"
import Email from "../models/Email"

// Login
export const userFetch = async(userFront: UserFront)=>{
    try{
        const response = await fetch("https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/",{ 
        // const response = await fetch("http://localhost:8080/auth/login",{ 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userFront)
        })
        if(response.ok){
            return await response.json()
        }else{
            throw new Error(`Los datos ingresados son incorrectos. Intentalo de nuevo.`);
        }
    }catch(e){
        if (e instanceof Error) {
            if (e.message === "Failed to fetch") {
                throw new Error("No se pudo conectar al servidor. Vuelve a intentarlo más tarde.");
            } else {            
            throw new Error(e.message);
            }
        }
        throw new Error('Error desconocido');         
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
    }     
}
// User Management
export async function getUsers(token :string):Promise<UserData[]>{
    try{
        const response = await fetch("https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/users",{  
        // const response = await fetch("http://localhost:8080/users",{  
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
    }
}
export async function updateUser(token: string, id_user: number, body: UserUpdate){
    try{
        const response = await fetch(`https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/updateuser`,{  
        // const response = await fetch(`http://localhost:8080/users/update?id=${id_user}`,{  
            method: "PUT",
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
    }     
}
export async function addUser(token: string, body: UserCreate){
    try{
        const response = await fetch(`https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/createuser`,{  
        // const response = await fetch(`http://localhost:8080/users/register`,{  
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
    }     
}
export async function stateUser(token: string, id_user: number, body: string){
    try{
        const response = await fetch(`https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/modifiedstatus`,{  
        // const response = await fetch(`http://localhost:8080/users/toggle-activation?id=${id_user}&status=${body}`,{  
            method: "PUT",
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
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        throw new Error(errorMessage);
    }     
}


