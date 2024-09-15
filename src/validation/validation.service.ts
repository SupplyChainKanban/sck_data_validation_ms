import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateValidationRuleDto } from './dto/create-validation-rule.dto';
import { PrismaClient } from '@prisma/client';
import { SCK_NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { handleExceptions } from 'src/common';

@Injectable()
export class ValidationService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('DataValidationService');

  constructor(
    @Inject(SCK_NATS_SERVICE) private readonly client: ClientProxy
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected')
  }

  async create(createValidationRuleDto: CreateValidationRuleDto) {
    try {
      return await this.validationRule.create({ data: createValidationRuleDto });
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  validate() {
    return 'This actions returns a validated data'
  }
}
