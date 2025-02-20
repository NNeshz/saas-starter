'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PublicPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <motion.section initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-4">
                <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 text-center md:text-left">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm w-fit">Bienvenido al futuro</span>
                    <h1 className="text-4xl md:text-7xl/20 font-medium tracking-tight max-w-3xl">Agiliza tu trabajo con Inteligencia Artificial</h1>
                    <p className="text-base md:text-2xl max-w-2xl text-muted-foreground">
                        Descubre como puedes llevar la administración de tu negocio al siguiente nivel con la IA, con una interfaz intuitiva y fácil de usar.
                    </p>
                    <Button className="gap-2 w-fit text-base md:text-lg py-4 px-6 md:py-6 md:px-8" size="lg">
                        Conocer más
                        <ArrowRight size={50} strokeWidth={3} />
                    </Button>
                </div>
                <div>
                    {/* Image for Desktop */}
                    <Image src="/sparks.png" alt="Sparks" width={300} height={300} className="hidden md:block" />

                    {/* Image for Mobile */}
                    <Image src="/sparks.png" alt="Sparks" width={200} height={200} className="block md:hidden" />
                </div>
            </motion.section>
        </div>
    )
}