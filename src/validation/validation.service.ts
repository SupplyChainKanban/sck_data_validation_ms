import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateValidationRuleDto } from './dto/create-validation-rule.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ValidationService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('DataValidationService');


  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected')
  }

  create(createValidationRuleDto: CreateValidationRuleDto) {
    return this.validationRule.create({
      data: createValidationRuleDto
    });
  }

  validate() {
    return 'This actions returns a validated data'
  }
}
