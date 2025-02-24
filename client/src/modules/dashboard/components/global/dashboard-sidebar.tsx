"use client"

import * as React from "react"
import {
    Building,
    CalendarCheck,
    CalendarDays,
    ChartBar,
    ClipboardCheck,
    ClipboardList,
    Command,
    CreditCard,
    FilePlus,
    FileText,
    HeartPulse,
    Hospital,
    LayoutDashboard,
    LifeBuoy,
    MedalIcon,
    MessageCircle,
    ReceiptIcon,
    ReceiptText,
    ScanFace,
    ScrollText,
    UserCheck,
    Users,
} from "lucide-react"

import { NavMain } from "@/modules/dashboard/components/global/nav-main"
import { NavSecondary } from "@/modules/dashboard/components/global/nav-secondary"
import { NavUser } from "@/modules/dashboard/components/global/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUsers } from "@/modules/login/hooks/useUsers"
import { Skeleton } from "@/components/ui/skeleton"

const data = {
    user: {
        name: "Dr. John Doe",
        email: "dr.johndoe@example.com",
        avatar: "",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Métricas",
                    url: "#",
                    icon: ChartBar,
                },
                {
                    title: "Empleados",
                    url: "#",
                    icon: UserCheck,
                },
                {
                    title: "Administración",
                    url: "#",
                    icon: Building,
                },
            ],
        },
        {
            title: "Pacientes",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Lista de Pacientes",
                    url: "#",
                    icon: MedalIcon,
                },
                {
                    title: "Añadir Paciente",
                    url: "#",
                    icon: UserCheck,
                },
            ],
        },
        {
            title: "Historial Clínico",
            url: "#",
            icon: ClipboardList,
            items: [
                {
                    title: "Buscar Historial",
                    url: "#",
                    icon: ScrollText,
                },
                {
                    title: "Añadir Registro",
                    url: "#",
                    icon: FilePlus,
                },
            ],
        },
        {
            title: "Citas Médicas",
            url: "#",
            icon: CalendarCheck,
            items: [
                {
                    title: "Agenda de Citas",
                    url: "#",
                    icon: CalendarDays,
                },
                {
                    title: "Nueva Cita",
                    url: "#",
                    icon: FileText,
                },
            ],
        },
        {
            title: "Pagos",
            url: "#",
            icon: CreditCard,
            items: [
                {
                    title: "Historial de Pagos",
                    url: "#",
                    icon: ReceiptIcon,
                },
                {
                    title: "Registrar Pago",
                    url: "#",
                    icon: ClipboardCheck,
                },
                {
                    title: "Facturación",
                    url: "#",
                    icon: ReceiptText,
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Soporte",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Sugerencias",
            url: "#",
            icon: MessageCircle,
        },
    ],
    clinics: [
        {
            name: "Clínica Central",
            url: "#",
            icon: Hospital,
        },
        {
            name: "Centro de Rehabilitación",
            url: "#",
            icon: HeartPulse,
        },
        {
            name: "Odontología Premium",
            url: "#",
            icon: ScanFace,
        },
    ],
};


export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUsers();

    if (isLoadingUser) return <SidebarSkeleton />
    if (isErrorUser) return <SidebarError />

    return (
        <Sidebar
            className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] flex flex-col border-r bg-sidebar"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">San Miguel</span>
                                    <span className="truncate text-xs">Clinica central</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {user && <NavUser user={user} />}
            </SidebarFooter>
        </Sidebar>
    )
}

export const SidebarSkeleton = () => {
    return (
        <Sidebar
            className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] flex flex-col border-r bg-sidebar"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">San Miguel</span>
                                    <span className="truncate text-xs">Clinica central</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <Skeleton className="h-10 w-full" />
            </SidebarFooter>
        </Sidebar>
    )
}

export const SidebarError = () => {
    return (
        <Sidebar
            className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] flex flex-col border-r bg-sidebar"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-destructive">Error</span>
                                    <span className="truncate text-xs text-destructive">Error</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <p className="text-destructive">Error al cargar el sidebar</p>
            </SidebarContent>
            <SidebarFooter>
                <p className="text-destructive">Error al cargar el sidebar</p>
            </SidebarFooter>
        </Sidebar>
    )
}
