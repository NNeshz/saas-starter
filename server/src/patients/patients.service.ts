import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponseBuilder } from 'src/common/utils/api-response.builder';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const encryptedData = {
        ...createPatientDto,
        fullName: this.encryptionService.encrypt(createPatientDto.fullName),
        email: createPatientDto.email ? this.encryptionService.encrypt(createPatientDto.email) : null,
        dateOfBirth: this.encryptionService.encrypt(createPatientDto.dateOfBirth.toISOString()),
        phoneNumber: this.encryptionService.encrypt(createPatientDto.phoneNumber),
        street: this.encryptionService.encrypt(createPatientDto.street),
        colony: createPatientDto.colony ? this.encryptionService.encrypt(createPatientDto.colony) : null,
        municipality: this.encryptionService.encrypt(createPatientDto.municipality),
        state: this.encryptionService.encrypt(createPatientDto.state),
        emergencyContactName: this.encryptionService.encrypt(createPatientDto.emergencyContactName),
        emergencyContactPhone: this.encryptionService.encrypt(createPatientDto.emergencyContactPhone),
        insuranceNumber: this.encryptionService.encrypt(createPatientDto.insuranceNumber),
      }
      // Se valida que el paciente existe si se repiten estos datos:
      // - Teléfono
      // - Nombre
      // - Apellido
      // - Segundo apellido
      const patientExists = await this.prisma.patient.findFirst({
        where: {
          phoneNumber: encryptedData.phoneNumber,
          fullName: encryptedData.fullName,
        }
      });
      if (patientExists) {
        throw new BadRequestException('El paciente ya existe');
      }

      // Se crea el paciente
      const patient = await this.prisma.patient.create({
        data: encryptedData
      });
      if (!patient) {
        throw new BadRequestException('Error al crear el paciente');
      }

      const decryptedData = {
        fullName: this.encryptionService.decrypt(patient.fullName),
        phoneNumber: this.encryptionService.decrypt(patient.phoneNumber),
      }

      return ApiResponseBuilder.success(decryptedData, 'Patient created successfully');
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
