export interface JWT{
    token: string;
}

export interface UserFront {
    username: string;
    password: string;
}

export interface UserBack {
    userId: number;
    firstName: string;
    lastName: string;
    role: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface Email {
    email: string;
}

export interface NewPassword {
    token: string,
    newPassword: string
}

export interface UserActive {
    id_user: number;
    status: string;
}

export interface UserData {
    idUser: number;
    firstName: string;
    lastName: string;
    dni: number;
    phone: number;
    username: string;
    status: string;
}

export interface UserCreate {
    username: string;
    firstname: string;
    lastname: string;
    dni: number;
    phone: number;
    password: string;
}

export interface UserUpdate {
    id_user: number;
    username: string;
    firstname: string;
    lastname: string;
    dni: number;
    phone: number
}
