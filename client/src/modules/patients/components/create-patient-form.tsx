"use client"

import { Genders } from "@/modules/common/types/prisma-enums"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
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

import { format, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from "@/lib/utils"

const patientSchema = z.object({
    firstName: z.string().min(2).max(50),
    firstSurname: z.string().min(2).max(50),
    secondSurname: z.string().min(2).max(50),
    dateOfBirth: z.date(),
    gender: z.nativeEnum(Genders),
    phoneNumber: z.string().min(2).max(50),
    street: z.string().min(2).max(50),
})

export function CreatePatientForm() {
    const patientForm = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            firstName: "",
            firstSurname: "",
            secondSurname: "",
            dateOfBirth: new Date(),
            gender: Genders.MALE,
            phoneNumber: "",
            street: "",
        }
    })

    const onSubmit = (values: z.infer<typeof patientSchema>) => {
        console.log(values)
    }

    return (
        <Form {...patientForm}>
            <form onSubmit={patientForm.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={patientForm.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del paciente" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nombre o nombres del paciente.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={patientForm.control}
                        name="firstSurname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido Paterno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido Paterno del paciente" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Apellido paterno del paciente.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={patientForm.control}
                        name="secondSurname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido Materno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido Materno del paciente" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Apellido materno del paciente.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={patientForm.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Nacimiento</FormLabel>
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
                                <PopoverContent className="w-auto p-0 bg-black border border-white/10">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        fromDate={subYears(new Date(), 100)}
                                        toDate={new Date()}
                                        captionLayout="dropdown"
                                        classNames={{
                                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: cn(
                                                buttonVariants({ variant: "ghost" }),
                                                "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10"
                                            ),
                                            day_selected: "rounded-full bg-primary hover:bg-primary/90",
                                            caption_dropdowns: "flex w-full items-center justify-center space-x-2",
                                            dropdown: "w-full px-1 py-2 bg-white/5 rounded-md hover:bg-white/10 focus:outline-none",
                                            nav_button: cn(
                                                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                                "border border-white/20"
                                            ),
                                        }}
                                        components={{
                                            Dropdown: ({ ...props }) => (
                                                <select
                                                    {...props}
                                                    className="w-full px-1 py-2 text-sm text-white transition-all duration-300 rounded-md outline-none bg-white/5 hover:bg-white/10"
                                                />
                                            ),
                                            IconLeft: () => <ChevronLeft className="w-4 h-4" />,
                                            IconRight: () => <ChevronRight className="w-4 h-4" />,
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Para calcular la edad del paciente.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full text-white">Submit</Button>
            </form>
        </Form>
    )
}
