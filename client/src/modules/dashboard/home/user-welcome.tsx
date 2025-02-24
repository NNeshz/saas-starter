'use client'

import { useUsers } from "@/modules/login/hooks/useUsers"
import { Badge } from "@/components/ui/badge"
import { UserRoles } from "@/modules/login/interfaces/auth-interface";
import { getColorAndLabelForAdminRole, getColorAndLabelForRole } from "@/lib/utils/get-color-and-label";
import { AdminRoles } from "@/modules/login/interfaces/auth-interface";

export function UserWelcome() {
    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUsers();

    if (isLoadingUser) return <UserWelcomeSkeleton />
    if (isErrorUser) return <UserWelcomeError />

    const userData = user?.data;

    return (
        <div>
            <span className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                    {userData?.name || ''}
                </p>
                <Badge variant="outline" className={`${getColorAndLabelForRole(userData?.userRole as UserRoles).color} px-2 py-1 text-white`}>
                    {getColorAndLabelForRole(userData?.userRole as UserRoles).label}
                </Badge>
                <Badge variant="outline" className={`${getColorAndLabelForAdminRole(userData?.adminRole as AdminRoles).color} px-2 py-1 text-white`}>
                    {getColorAndLabelForAdminRole(userData?.adminRole as AdminRoles).label}
                </Badge>
            </span>
            <p className="text-sm text-gray-500">
                {userData?.email || ''}
            </p>
        </div>
    )
}

const UserWelcomeSkeleton = () => {
    return (
        <div>
            <p className="text-2xl font-bold rounded-full">Cargando usuario...</p>
            <p className="text-sm rounded-full">Espere un momento...</p>
        </div>
    )
}

const UserWelcomeError = () => {
    return (
        <div>
            <p className="text-2xl font-bold text-destructive-foreground">Hubo un error al cargar el usuario</p>
            <p className="text-sm text-destructive-foreground">Por favor intente nuevamente</p>
        </div>
    )
}
