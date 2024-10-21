export const handleHttpError = (statusCode: number, message: string): never => {
  switch (statusCode) {
    case 400:
      throw new Error(`Solicitud incorrecta`);
    case 401:
      throw new Error(`Usuario o contraseña incorrecta`);
    case 403:
      throw new Error(`Prohibido: ${message}`);
    case 404: 
      throw new Error(`No encontrado: ${message}`);
    case 409:
      throw new Error(`Conflicto: ${message}`);      
    case 500:
      throw new Error(`Error del servidor: ${message}`);
    case 503:
        throw new Error(`Servicio no disponible: ${message}`);      
    default:
      throw new Error(`Error inesperado (${statusCode}): ${message}`);
  }
};

//Verifica si el error en el fetch es un error de red
export const isNetworkError = (e: unknown): boolean => 
  e instanceof TypeError && e.message.includes("fetch");
