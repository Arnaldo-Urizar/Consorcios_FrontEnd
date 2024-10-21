export default interface WebApiResponse<T>{
    data: T,
    message:string,
    success:boolean,
    statusCode:number,
    error:string,
    timestamp:string  
}