import { Rules } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { rulesList } from '../enums/rules.enum';

export class CreateValidationRuleDto {
    // TODO: DESCOMENTAR CUANDO SE TRABAJE CON DATA REAL
    // @IsUUID()
    @IsString()
    sourceId: string;

    @IsString()
    keyName: string;

    @IsEnum(rulesList, {
        message: `Possible rules values are ${rulesList}`
    })
    rule: Rules;

    @IsOptional()
    @IsString()
    regexPattern?: string;

}
