export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    dob: Date;
    email: string;
    gender: string;
    authorities: string[];
}