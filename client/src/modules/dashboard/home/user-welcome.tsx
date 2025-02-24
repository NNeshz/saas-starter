'use client'

import { useUsers } from "@/modules/login/hooks/useUsers"

export function UserWelcome() {
    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUsers();

    if (isLoadingUser) return <UserWelcomeSkeleton />
    if (isErrorUser) return <UserWelcomeError />

    return (
        <div>
            <p className="text-2xl font-bold">Bienvenido, {user?.name || ''}</p>
            <p className="text-sm text-gray-500">
                {user?.email || ''}
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
