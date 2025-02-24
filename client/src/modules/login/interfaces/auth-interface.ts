export enum AdminRoles {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum UserRoles {
    DOCTOR = 'DOCTOR',
    NUTRITIONIST = 'NUTRITIONIST',
    PHYSIOTHERAPIST = 'PHYSIOTHERAPIST',
    DENTIST = 'DENTIST',
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    adminRole: AdminRoles;
    userRole: UserRoles;
}

export interface UserResponse {
    success: string;
    data: User;
}
