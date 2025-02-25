import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { HasRoles } from 'src/auth/decorator/roles.decorator';
import { AdminRoles } from '@prisma/client';
import { FilterPatientDto } from './dto/filter-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  @HasRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, AdminRoles.USER)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @HasRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, AdminRoles.USER)
  findAll(@Query() filterPatientDto: FilterPatientDto) {
    return this.patientsService.findAll(filterPatientDto);
  }

  @Get(':id')
  @HasRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, AdminRoles.USER)
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @HasRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN, AdminRoles.USER)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @HasRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
