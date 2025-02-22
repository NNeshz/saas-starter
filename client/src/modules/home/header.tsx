'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";


export function Header() {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
            {/* Top-left blob */}
            <div className="absolute w-[45vw] h-[45vw] md:w-[30vw] md:h-[30vw] 
                bg-[radial-gradient(circle,rgba(142,68,173,0.08),rgba(155,89,182,0.08))]
                -top-[10%] -left-[10%]
                rounded-full blur-[80px] z-0">
            </div>

            {/* Top-right blob */}
            <div className="absolute w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw]
                bg-[radial-gradient(circle,rgba(125,60,152,0.08),rgba(108,52,131,0.08))]
                -top-[15%] -right-[15%]
                rounded-full blur-[100px] z-0">
            </div>

            {/* Center blob */}
            <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw]
                bg-[radial-gradient(circle,rgba(142,68,173,0.1),rgba(155,89,182,0.1))]
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                rounded-full blur-[120px] z-0">
            </div>

            {/* Bottom-left blob */}
            <div className="absolute w-[55vw] h-[55vw] md:w-[38vw] md:h-[38vw]
                bg-[radial-gradient(circle,rgba(108,52,131,0.08),rgba(125,60,152,0.08))]
                -bottom-[20%] -left-[15%]
                rounded-full blur-[90px] z-0">
            </div>

            {/* Bottom-right blob */}
            <div className="absolute w-[40vw] h-[40vw] md:w-[32vw] md:h-[32vw]
                bg-[radial-gradient(circle,rgba(155,89,182,0.08),rgba(142,68,173,0.08))]
                -bottom-[10%] -right-[10%]
                rounded-full blur-[70px] z-0">
            </div>

            <motion.section
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-4 z-10 relative"
            >
                <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 text-center md:text-left">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm w-fit">Bienvenido al futuro</span>
                    <h1 className="text-4xl md:text-7xl/20 font-medium tracking-tight max-w-3xl">Agiliza tu trabajo con Inteligencia Artificial</h1>
                    <p className="text-base md:text-2xl max-w-2xl text-muted-foreground">
                        Descubre como puedes llevar la administración de tu negocio al siguiente nivel con la IA, con una interfaz intuitiva y fácil de usar.
                    </p>
                    <Button className="gap-2 w-fit text-white text-base md:text-lg py-4 px-6 md:py-6 md:px-8" size="lg">
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