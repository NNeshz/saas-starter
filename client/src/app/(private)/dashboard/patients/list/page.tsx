'use client'

import { usePatients } from "@/modules/patients/hooks/usePatients"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PatientsResponse } from "@/modules/patients/interfaces/patient-response"

export default function PatientsListPage() {

    const { data, isLoading, error } = usePatients()

    const patients = data?.data || []

    if (isLoading) return <PatientTableLoading />
    if (error) return <PatientTableError />

    return (
        <PatientTable patients={patients} />
    )
}

const PatientTableLoading = () => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/4">
                        ID
                    </TableHead>
                    <TableHead className="w-1/4">
                        Nombre
                    </TableHead>
                    <TableHead className="w-1/4">
                        Email
                    </TableHead>
                    <TableHead className="w-1/4">
                        Teléfono
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4} className="text-center">
                        Cargando pacientes...
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const PatientTableError = () => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/4">
                        ID
                    </TableHead>
                    <TableHead className="w-1/4">
                        Nombre
                    </TableHead>
                    <TableHead className="w-1/4">
                        Email
                    </TableHead>
                    <TableHead className="w-1/4">
                        Teléfono
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4} className="text-center">
                        Error al cargar los pacientes
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const PatientTable = ({ patients }: { patients: PatientsResponse[] }) => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/4">
                        ID
                    </TableHead>
                    <TableHead className="w-1/4">
                        Nombre
                    </TableHead>
                    <TableHead className="w-1/4">
                        Email
                    </TableHead>
                    <TableHead className="w-1/4">
                        Teléfono
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient.id}>
                        <TableCell>{patient.id}</TableCell>
                        <TableCell>{patient.fullName}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
