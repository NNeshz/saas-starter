"use client"

import {
    Calculator,
    CreditCard,
    Settings,
    Smile,
    User,
    UserPlus2Icon,
} from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { SidebarIcon } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
    const [open, setOpen] = useState(false)
    const { toggleSidebar } = useSidebar()
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full items-center border-b bg-background">
            <div className="flex h-14 w-full items-center gap-4 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>

                <Button
                    variant="outline"
                    className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                    onClick={() => setOpen(true)}
                >
                    <span className="hidden lg:inline-flex">Buscar...</span>
                    <span className="inline-flex lg:hidden">Buscar...</span>
                    <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>J
                    </kbd>
                </Button>

                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Buscar..." />
                    <CommandList className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup heading="Sugerencias">
                            <CommandItem className="flex items-center gap-2" onSelect={() => {
                                setOpen(false)
                                router.push("/dashboard/patients/create")
                            }}>
                                <UserPlus2Icon />
                                <span>Crear Paciente</span>
                            </CommandItem>
                            <CommandItem className="flex items-center gap-2" onSelect={() => {
                                setOpen(false)
                                router.push("/dashboard/patients/list")
                            }}>
                                <Smile />
                                <span>Lista de Pacientes</span>
                            </CommandItem>
                            <CommandItem>
                                <Calculator />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <User />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCard />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <Settings />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>
        </header>
    )
}
