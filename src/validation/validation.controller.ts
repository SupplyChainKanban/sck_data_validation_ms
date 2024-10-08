import { Controller, NotImplementedException } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ValidationService } from './validation.service';
import { CreateValidationRuleDto } from './dto/create-validation-rule.dto';
import { ChangeResultStatusDto, ValidateDataDto } from './dto';

@Controller()
export class ValidationController {
  constructor(private readonly validationService: ValidationService) { }

  @MessagePattern('createValidationRule')
  create(@Payload() createValidationRuleDto: CreateValidationRuleDto) {
    return this.validationService.create(createValidationRuleDto);
  }

  @EventPattern('validate.rawData')
  @MessagePattern('validate.rawData')
  validate(@Payload() validateDataDto: ValidateDataDto) {
    return this.validationService.validate(validateDataDto);
  }

  @EventPattern('update.validationResult.status')
  @MessagePattern('update.validationResult.status')
  updateStatus(@Payload() changeResultStatusDto: ChangeResultStatusDto) {
    return this.validationService.updateStatus(changeResultStatusDto);
  }



}
