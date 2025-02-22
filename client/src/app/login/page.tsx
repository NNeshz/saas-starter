'use client'

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/svg/google";
import { motion } from "framer-motion";

export default function LoginPage() {

    const handleLogin = async () => {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin  `
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center gap-4"
            >
                <p className="text-3xl font-medium">Inicia sesión, solo si eres un administrador</p>
                <p className="text-sm text-muted-foreground">Si no tienes una relación, puedes contactar al administrador</p>
                <Button
                    className="rounded-full gap-2 cursor-pointer bg-primary text-white"
                    onClick={handleLogin}
                >
                    <GoogleIcon />
                    Iniciar sesión con Google
                </Button>
            </motion.div>
        </div>
    )
}
