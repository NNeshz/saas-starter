import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponseBuilder } from 'src/common/utils/api-response.builder';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPatientDto: CreatePatientDto) {
    try {
      // Se valida que el paciente existe si se repiten estos datos:
      // - Teléfono
      // - Nombre
      // - Apellido
      // - Segundo apellido
      const patientExists = await this.prisma.patient.findFirst({
        where: {
          phoneNumber: createPatientDto.phoneNumber,
          firstName: createPatientDto.firstName,
          firstSurname: createPatientDto.firstSurname,
          secondSurname: createPatientDto.secondSurname
        }
      });
      if (patientExists) {
        throw new BadRequestException('El paciente ya existe');
      }

      // Se crea el paciente
      const patient = await this.prisma.patient.create({
        data: createPatientDto
      });
      if (!patient) {
        throw new BadRequestException('Error al crear el paciente');
      }

      return ApiResponseBuilder.success(patient, 'Patient created successfully');
    } catch (error) {
      return ApiResponseBuilder.error(error, 'Error creating patient');
    }
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
