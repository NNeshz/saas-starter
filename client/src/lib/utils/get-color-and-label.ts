import { AdminRoles, UserRoles } from "@/modules/login/interfaces/auth-interface";

export function getColorAndLabelForRole(role: UserRoles): { color: string, label: string } {
    switch (role) {
        case UserRoles.DOCTOR:
            return { color: 'bg-primary', label: 'Doctor' };
        case UserRoles.NUTRITIONIST:
            return { color: 'bg-green-500', label: 'Nutricionista' };
        case UserRoles.PHYSIOTHERAPIST:
            return { color: 'bg-yellow-500', label: 'Fisioterapeuta' };
        case UserRoles.DENTIST:
            return { color: 'bg-blue-500', label: 'Odontólogo' };
        default:
            return { color: 'bg-gray-500', label: 'Enfermero' };
    }
}

export function getColorAndLabelForAdminRole(role: AdminRoles): { color: string, label: string } {
    switch (role) {
        case AdminRoles.SUPERADMIN:
            return { color: 'bg-primary', label: 'Superadmin' };
        case AdminRoles.ADMIN:
            return { color: 'bg-primary', label: 'Administrador' };
        default:
            return { color: 'bg-primary', label: 'Usuario' };
    }
}

