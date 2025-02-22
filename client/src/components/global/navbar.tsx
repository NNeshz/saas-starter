'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
    {
        label: "Inicio",
        href: "/login"
    },
    {
        label: "Acerca de",
        href: "/about"
    },
    {
        label: "Servicios",
        href: "/services"
    },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full h-16 max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
            <div className={`max-w-7xl w-full h-full mx-auto flex items-center justify-between px-4 ${isOpen ? "bg-background" : "bg-none"}`}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="https://nneshz.vercel.app" className="font-semibold text-xl" target="_blank">
                        NNeshz
                    </Link>
                </motion.div>

                <div className="items-center gap-8 hidden md:flex">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <Button variant="ghost" className="gap-2 items-center md:flex hidden text-primary">
                        <Calendar size={20} />
                        <span className="sr-only">Calendario</span>
                        <span className="text-sm font-medium">Agenda una cita</span>
                    </Button>

                    <ModeToggle />

                    <Button variant="ghost" className="gap-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                        <span className="sr-only">Menú</span>
                    </Button>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
                    >
                        <div className="flex flex-col items-center py-4 gap-4">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                            >
                                <Button variant="ghost" className="gap-2 text-primary">
                                    <Calendar size={20} />
                                    <span className="text-base font-medium">Agenda una cita</span>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}