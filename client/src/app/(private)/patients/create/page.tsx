import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePatientForm } from "@/modules/patients/components/create-patient-form";

export default function CreatePatientPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Crear Paciente</CardTitle>
                    <CardDescription>
                        Completa la información del formulario para agregar un nuevo paciente al sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreatePatientForm />
                </CardContent>
            </Card>
        </div>
    )
}
