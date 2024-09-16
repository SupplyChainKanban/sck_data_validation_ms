import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateValidationRuleDto } from './dto/create-validation-rule.dto';
import { PrismaClient } from '@prisma/client';
import { SCK_NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { handleExceptions, validateByRule } from 'src/common';
import { ChangeResultStatusDto, ValidateDataDto, ValidationLogDto, ValidationResultDto } from './dto';
import { Rule } from 'src/common/index';
import { ChangeRawDataStatusDto } from './dto/change-raw-data-status.dto';
import { RawDataStatus } from './enums/data.enum';

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
    this.logger.log('Data Validation DB connected')
  }

  async create(createValidationRuleDto: CreateValidationRuleDto) {
    try {
      return await this.validationRule.create({ data: createValidationRuleDto });
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async validate(validateDataDto: ValidateDataDto): Promise<ChangeRawDataStatusDto> {
    try {
      const rules: Rule[] = await this.validationRule.findMany({
        where: { sourceId: validateDataDto.sourceId },
        omit: { updatedAt: true, createdAt: true },
      })

      const errors: String[] = validateByRule(rules, validateDataDto);

      if (errors.length > 0) {
        const validationLog: ValidationLogDto = {
          rawDataId: validateDataDto.rawDataId,
          sourceId: validateDataDto.sourceId,
          errors: errors.join(', ')
        }
        await this.validationLog.create({ data: validationLog })
        return {
          id: validateDataDto.rawDataId,
          status: RawDataStatus.ERROR,
        }

      }

      //TODO: Cuando se tenga la data real, verificar si es necesario colocar una función para transformar la data
      //* const transformedData = this.transformData(validateDataDto.rawData)

      const validationResult: ValidationResultDto = {
        rawDataId: validateDataDto.rawDataId,
        validatedData: validateDataDto.dataPayload,
        priority: validateDataDto.priority,
      }

      await this.validationResult.create({ data: validationResult })

      return {
        id: validateDataDto.rawDataId,
        status: RawDataStatus.VALIDATED,
      }
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

}
