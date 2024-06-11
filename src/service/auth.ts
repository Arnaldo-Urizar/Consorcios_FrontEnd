import UserFront from "../models/UserFront"

// Funcion para enviar los datos al backend
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