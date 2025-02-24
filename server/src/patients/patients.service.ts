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
        firstName: this.encryptionService.encrypt(createPatientDto.firstName),
        firstSurname: this.encryptionService.encrypt(createPatientDto.firstSurname),
        secondSurname: this.encryptionService.encrypt(createPatientDto.secondSurname),
        phoneNumber: this.encryptionService.encrypt(createPatientDto.phoneNumber),
        street: this.encryptionService.encrypt(createPatientDto.street),
        municipality: this.encryptionService.encrypt(createPatientDto.municipality),
        state: this.encryptionService.encrypt(createPatientDto.state),
        insuranceNumber: this.encryptionService.encrypt(createPatientDto.insuranceNumber),
        emergencyContactPhone: this.encryptionService.encrypt(createPatientDto.emergencyContactPhone),
        emergencyContactName: this.encryptionService.encrypt(createPatientDto.emergencyContactName),
      }
      // Se valida que el paciente existe si se repiten estos datos:
      // - Teléfono
      // - Nombre
      // - Apellido
      // - Segundo apellido
      const patientExists = await this.prisma.patient.findFirst({
        where: {
          phoneNumber: encryptedData.phoneNumber,
          firstName: encryptedData.firstName,
          firstSurname: encryptedData.firstSurname,
          secondSurname: encryptedData.secondSurname
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
        firstName: this.encryptionService.decrypt(patient.firstName),
        firstSurname: this.encryptionService.decrypt(patient.firstSurname),
        secondSurname: this.encryptionService.decrypt(patient.secondSurname),
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
