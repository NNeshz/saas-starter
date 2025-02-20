import { PrismaClient } from "@prisma/client";
import { authorizedUsers } from "./data/authorized-users";

const prisma = new PrismaClient();

async function seed() {
    console.log("Iniciando seed...");

    // Limpiar la tabla existente
    await prisma.authorizedUser.deleteMany();

    // Insertar los usuarios autorizados
    for(const user of authorizedUsers) {
        const authorizedUser = await prisma.authorizedUser.create({
            data: user
        });
        console.log(`Usuario autorizado insertado: ${authorizedUser.email}`);
    }

    console.log("Seed completado exitosamente.");
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });