import UserFront from "../models/UserFront"

// Funcion para enviar los datos al backend
export const userFetch = async(userFront: UserFront)=>{
    try{
        
        //Configuración de la solicitud
        const response = await fetch("https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/login",{   
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userFront)
        })

        if(response.ok){
            console.log("Fetch exitoso:"), 
            console.log(response)
            
            return await response.json()
        }else{
            console.log("Fetch falló");
            return null;
        }
    }catch(e){
        console.error("No se pudo realizar el fetch" + e);
    }
}