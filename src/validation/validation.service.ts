import { Injectable } from '@nestjs/common';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';

@Injectable()
export class ValidationService {
  create(createValidationDto: CreateValidationDto) {
    return 'This action adds a new validation';
  }

  validate() {
    return 'This actions returns a validated data'
  }
}
