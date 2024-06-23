import UserFront from "../models/UserFront"

// Funcion para enviar los datos al backend
export const userFetch = async(userFront: UserFront)=>{

    try{
        //Configuración de la solicitud
        // const response = await fetch("http://localhost:8080/auth/login",{ 
        const response = await fetch("https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/",{ 

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