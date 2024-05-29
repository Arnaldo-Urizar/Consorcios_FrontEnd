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
            console.log("Fetch exitoso.")         
            return await response.json()
        }else{
            console.log("Fetch falló");
            return null;
        }
    }catch(e){
        console.error("No se pudo obtener los datos del servidor" + e);
        return null;
    }
}