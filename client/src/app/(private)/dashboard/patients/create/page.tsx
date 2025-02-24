import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePatientForm } from "@/modules/patients/components/create-patient-form";
import { UserPlus2Icon } from "lucide-react";

export default function CreatePatientPage() {
    return (
        <div className="container mx-auto px-4 py-4">
            <Card className="max-w-3xl mx-auto">
                <CardHeader className="flex flex-col items-start md:flex-row md:items-center gap-2">
                    <UserPlus2Icon className="w-12 h-12 bg-primary text-primary-foreground rounded p-2" />
                    <div>
                        <CardTitle className="text-2xl font-bold">Crear paciente</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Completa la información del formulario para agregar un nuevo paciente al sistema.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <CreatePatientForm />
                </CardContent>
            </Card>
        </div>
    )
}
