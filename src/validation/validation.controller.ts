import { Controller, NotImplementedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidationService } from './validation.service';
import { CreateValidationRuleDto } from './dto/create-validation-rule.dto';

@Controller()
export class ValidationController {
  constructor(private readonly validationService: ValidationService) { }

  @MessagePattern('createValidationRule')
  create(@Payload() createValidationRuleDto: CreateValidationRuleDto) {
    return this.validationService.create(createValidationRuleDto);
  }

  @MessagePattern('validate')
  validate() {
    return this.validationService.validate();
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
