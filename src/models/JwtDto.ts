export default interface JwtDto{
    isLogin: boolean,
    token: string;
    authorities: string[];
}
