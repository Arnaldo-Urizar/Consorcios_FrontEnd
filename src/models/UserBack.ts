export default interface UserBack {
    userId: number;
    firstName: string;
    lastName: string;
    role: string;
    sub: string;
    iat: number;
    exp: number;
}
// {
//     "userId": "1234567890",
//     "firstName": "Juan",
//     "lastName": "Pablo",
//     "role": ["ROLE_ADMIN"],
//     "sub": "pepe@gmail.com",
//     "iat": 1516239022,
//     "exp": 22
// }