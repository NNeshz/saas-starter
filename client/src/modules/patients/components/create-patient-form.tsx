"use client"

import { CivilStatus, Genders, Relationships } from "@/modules/common/types/prisma-enums"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { format, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from "@/lib/utils"
import { CreatePatientDto } from "../interfaces/create-patient"

const patientSchema = z.object({
    fullName: z.string().min(2).max(50),
    email: z.string().email().optional(),
    dateOfBirth: z.date(),
    gender: z.nativeEnum(Genders),
    civilStatus: z.nativeEnum(CivilStatus),
    phoneNumber: z.string().min(2).max(50),
    street: z.string().min(2).max(50),
    colony: z.string().min(2).max(50).optional(),
    municipality: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    emergencyContactName: z.string().min(2).max(50),
    emergencyContactPhone: z.string().min(2).max(50),
    relationship: z.nativeEnum(Relationships),
    insuranceNumber: z.string().min(2).max(50),
})

export function CreatePatientForm() {
    const patientForm = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: new Date(),
            gender: Genders.MALE,
            civilStatus: CivilStatus.SINGLE,
            street: "",
            colony: "",
            municipality: "",
            state: "",
            emergencyContactName: "",
            emergencyContactPhone: "",
            relationship: Relationships.FAMILY,
            insuranceNumber: "",
        }
    })

    const onSubmit = (values: z.infer<typeof patientSchema>) => {
        const patient: CreatePatientDto = {
            fullName: values.fullName,
            email: values.email,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
            civilStatus: values.civilStatus,
            phoneNumber: values.phoneNumber,
            street: values.street,
            colony: values.colony,
            municipality: values.municipality,
            state: values.state,
            emergencyContactName: values.emergencyContactName,
            emergencyContactPhone: values.emergencyContactPhone,
            relationship: values.relationship,
            insuranceNumber: values.insuranceNumber,
        }

        console.log(patient)
    }

    return (
        <Form {...patientForm}>
            <form onSubmit={patientForm.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={patientForm.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full md:flex-row items-center">
                            <FormLabel className="text-sm font-medium w-full md:w-1/3">Nombre</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Nombre completo del paciente" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={patientForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full md:flex-row items-center justify-between">
                            <FormLabel className="text-sm font-medium w-full md:w-1/3">Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Correo electrónico" className="w-full md:w-96" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={patientForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full md:flex-row items-center justify-between">
                            <FormLabel className="text-sm font-medium w-full md:w-1/3">Teléfono</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Teléfono del paciente" className="w-full md:w-96" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={patientForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Fecha de Nacimiento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start font-normal bg-white/5",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"
                                                    ></path>
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4.75V8.25"></path>
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 4.75V8.25"></path>
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 10.75H16.25"></path>
                                                </svg>
                                                {field.value ? format(field.value, "PPP") : "Seleccionar fecha"}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-background border-border">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            fromDate={subYears(new Date(), 100)}
                                            toDate={new Date()}
                                            captionLayout="dropdown"
                                            classNames={{
                                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent"
                                                ),
                                                day_selected: "rounded-full bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                                                caption_dropdowns: "flex w-full items-center justify-center space-x-2",
                                                dropdown: "w-full px-2 py-2 bg-background border border-input rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
                                                caption: "flex justify-center pt-1 relative items-center",
                                                caption_label: "hidden",
                                                nav_button: cn(
                                                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                                    "border border-input rounded-md hover:bg-accent"
                                                ),
                                            }}
                                            components={{
                                                Dropdown: ({ ...props }) => (
                                                    <select
                                                        {...props}
                                                        className="w-full px-2 py-1 text-sm transition-colors rounded-md outline-none bg-background border border-input hover:bg-accent focus:ring-2 focus:ring-ring"
                                                    />
                                                ),
                                                IconLeft: () => <ChevronLeft className="w-4 h-4" />,
                                                IconRight: () => <ChevronRight className="w-4 h-4" />,
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Género</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar género" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.values(Genders).map((gender) => (
                                                <SelectItem key={gender} value={gender}>
                                                    {gender}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="civilStatus"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Estado Civil</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormItem className="w-full">
                                            <FormControl >
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Seleccionar estado civil" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.values(CivilStatus).map((civilStatus) => (
                                                        <SelectItem key={civilStatus} value={civilStatus}>
                                                            {civilStatus}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </FormItem>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                        control={patientForm.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Calle</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Calle" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="colony"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Colonia</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Colonia" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="municipality"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Municipio</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Municipio" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Estado</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Estado" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={patientForm.control}
                        name="emergencyContactName"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Contacto de emergencia</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Nombre" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="emergencyContactPhone"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Teléfono</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Teléfono" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={patientForm.control}
                        name="relationship"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Parentesco</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar parentesco" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.values(Relationships).map((relationship) => (
                                                        <SelectItem key={relationship} value={relationship}>
                                                            {relationship}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </FormItem>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <FormField
                        control={patientForm.control}
                        name="insuranceNumber"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full items-start">
                                <FormLabel className="text-sm font-medium w-full">Número de seguro</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Número de seguro" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full text-white">Crear paciente</Button>
            </form>
        </Form>
    )
}
