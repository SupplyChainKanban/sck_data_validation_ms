import { Controller, NotImplementedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidationService } from './validation.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';

@Controller()
export class ValidationController {
  constructor(private readonly validationService: ValidationService) { }

  @MessagePattern('createValidationRule')
  create(@Payload() createValidationDto: CreateValidationDto) {
    return this.validationService.create(createValidationDto);
  }

  @MessagePattern('validate')
  validate() {
    throw new NotImplementedException()
  }

  // @MessagePattern('findAllValidation')
  // findAll() {
  //   return this.validationService.findAll();
  // }

  // @MessagePattern('findOneValidation')
  // findOne(@Payload() id: number) {
  //   return this.validationService.findOne(id);
  // }

  // @MessagePattern('updateValidation')
  // update(@Payload() updateValidationDto: UpdateValidationDto) {
  //   return this.validationService.update(updateValidationDto.id, updateValidationDto);
  // }

  // @MessagePattern('removeValidation')
  // remove(@Payload() id: number) {
  //   return this.validationService.remove(id);
  // }
}
